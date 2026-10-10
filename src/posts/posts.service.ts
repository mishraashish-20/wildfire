
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { fail } from '../common/api';
import { publicPost } from '../common/serializers';
import { AuthenticatedUser } from '../auth/auth.types';

interface IdRow {
  id: string;
}

interface SlugRow {
  id: string;
}

interface CategoryRow {
  id: string;
}

@Injectable()
export class PostsService {
  constructor(private readonly db: DataSource) { }

  async list(f: any) {
    const params: any[] = [];
    let where =
      `p."publicationStatus" = 'PUBLISHED' AND p."deletedAt" IS NULL`;

    const add = (sql: string, value: any) => {
      params.push(value);
      where += ` AND ${sql.replace('?', `$${params.length}`)}`;
    };

    if (f.category) add('c.value = ?', f.category);
    if (f.lifecycleStatus) {
      add('p."lifecycleStatus" = ?', f.lifecycleStatus);
    }
    if (f.location) {
      add(`LOWER(COALESCE(l.city, '')) = LOWER(?)`, f.location);
    }

    if (f.search) {
      params.push(`%${f.search}%`);
      const n = params.length;
      where +=
        ` AND (p.title ILIKE $${n} OR p.summary ILIKE $${n} OR p.body ILIKE $${n})`;
    }

    const rows: IdRow[] = await this.db.query(
      `SELECT p.id
       FROM "Post" p
       JOIN "PostCategory" c ON c.id = p."categoryId"
       LEFT JOIN "PostLocation" l ON l."postId" = p.id
       WHERE ${where}
       ORDER BY ${f.sort === 'most_discussed'
        ? '(SELECT COUNT(*) FROM "Comment" cm WHERE cm."postId" = p.id AND cm."deletedAt" IS NULL) DESC'
        : 'p."createdAt" DESC'
      }
       LIMIT $${params.length + 1}
       OFFSET $${params.length + 2}`,
      [...params, f.limit, (f.page - 1) * f.limit],
    );

    const result: any[] = [];

    for (const row of rows) {
      result.push(await this.loadPublicById(row.id));
    }

    return result;
  }

  async findBySlug(
    slug: string,
    user?: AuthenticatedUser | null,
  ) {
    const rows: IdRow[] = await this.db.query(
      `SELECT id
       FROM "Post"
       WHERE slug = $1
         AND "deletedAt" IS NULL
         AND (
           "publicationStatus" = 'PUBLISHED'
           OR (
             $2::uuid IS NOT NULL
             AND "authorId" = $2
             AND "publicationStatus" IN ('DRAFT', 'PENDING_REVIEW', 'HIDDEN')
           )
         )`,
      [slug, user?.id ?? null],
    );

    if (!rows[0]) {
      fail('NOT_FOUND', 'Report not found.', 404);
    }

    return this.loadPublicById(rows[0].id);
  }

  async create(i: any, u: AuthenticatedUser) {
    const categories: CategoryRow[] = await this.db.query(
      `SELECT id
       FROM "PostCategory"
       WHERE value = $1 AND "isActive" = TRUE`,
      [i.category],
    );

    const category = categories[0];

    if (!category) {
      fail('NOT_FOUND', 'Category not found.', 404);
    }

    const status =
      i.publicationStatus === 'DRAFT' ? 'DRAFT' : 'PENDING_REVIEW';

    const slug = await this.uniqueSlug(i.title);

    if ((i.media || []).length > 6) {
      fail(
        'VALIDATION_ERROR',
        'A post can contain at most 6 media items.',
        400,
      );
    }

    const inserted: IdRow[] = await this.db.query(
      `INSERT INTO "Post"
       (
         slug,
         "authorId",
         "categoryId",
         title,
         summary,
         body,
         "authorVisibility",
         "publicationStatus",
         "lifecycleStatus",
         "incidentDate",
         "publishedAt",
         "updatedAt"
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
       RETURNING id`,
      [
        slug,
        u.id,
        category.id,
        i.title,
        i.summary,
        i.body,
        i.authorVisibility,
        status,
        i.lifecycleStatus,
        i.incidentDate ? new Date(i.incidentDate) : null,
        null,
      ],
    );

    const post = inserted[0];

    if (i.location) {
      await this.saveLocation(post.id, i.location);
    }

    for (const media of i.media || []) {
      await this.saveMedia(post.id, media);
    }

    return this.loadPublicById(post.id);
  }

  async update(id: string, i: any, u: AuthenticatedUser) {
    const rows: any[] = await this.db.query(
      `SELECT *
       FROM "Post"
       WHERE id = $1 AND "deletedAt" IS NULL`,
      [id],
    );

    const post = rows[0];

    if (!post) {
      fail('NOT_FOUND', 'Report not found.', 404);
    }

    if (post.authorId !== u.id) {
      fail('FORBIDDEN', 'You can only edit your own report.', 403);
    }

    if (!['DRAFT', 'PENDING_REVIEW'].includes(post.publicationStatus)) {
      fail(
        'CONFLICT',
        'Only draft or pending reports can be edited.',
        409,
      );
    }

    const fields: Record<string, string> = {
      title: 'title',
      summary: 'summary',
      body: 'body',
      authorVisibility: '"authorVisibility"',
      lifecycleStatus: '"lifecycleStatus"',
    };

    const sets: string[] = [];
    const values: any[] = [];

    for (const [key, column] of Object.entries(fields)) {
      if (i[key] !== undefined) {
        values.push(i[key]);
        sets.push(`${column} = $${values.length}`);
      }
    }

    if (i.incidentDate !== undefined) {
      values.push(i.incidentDate ? new Date(i.incidentDate) : null);
      sets.push(`"incidentDate" = $${values.length}`);
    }

    if (sets.length) {
      values.push(id);

      await this.db.query(
        `UPDATE "Post"
         SET ${sets.join(', ')}, "updatedAt" = NOW()
         WHERE id = $${values.length}`,
        values,
      );
    }

    if (i.location !== undefined) {
      await this.db.query(
        `DELETE FROM "PostLocation" WHERE "postId" = $1`,
        [id],
      );

      if (i.location) {
        await this.saveLocation(id, i.location);
      }
    }

    if (i.media !== undefined) {
      if (i.media.length > 6) {
        fail(
          'VALIDATION_ERROR',
          'A post can contain at most 6 media items.',
          400,
        );
      }

      await this.db.query(
        `DELETE FROM "PostMedia" WHERE "postId" = $1`,
        [id],
      );

      for (const media of i.media) {
        await this.saveMedia(id, media);
      }
    }

    return this.loadPublicById(id);
  }

  async delete(id: string, u: AuthenticatedUser) {
    const rows: any[] = await this.db.query(
      `SELECT * FROM "Post" WHERE id = $1`,
      [id],
    );

    const post = rows[0];

    if (!post) {
      fail('NOT_FOUND', 'Report not found.', 404);
    }

    if (
      post.authorId !== u.id &&
      !['MODERATOR', 'ADMIN'].includes(u.role)
    ) {
      fail('FORBIDDEN', 'You cannot delete this report.', 403);
    }

    await this.db.query(
      `UPDATE "Post"
       SET "deletedAt" = NOW(),
           "publicationStatus" = 'REMOVED',
           "updatedAt" = NOW()
       WHERE id = $1`,
      [id],
    );

    return null;
  }

  async myPosts(u: AuthenticatedUser) {
    const rows: IdRow[] = await this.db.query(
      `SELECT id
       FROM "Post"
       WHERE "authorId" = $1 AND "deletedAt" IS NULL
       ORDER BY "createdAt" DESC`,
      [u.id],
    );

    const result: any[] = [];

    for (const row of rows) {
      result.push(await this.loadPublicById(row.id));
    }

    return result;
  }

  async addUpdate(id: string, i: any, u: AuthenticatedUser) {
    const rows: any[] = await this.db.query(
      `SELECT * FROM "Post" WHERE id = $1`,
      [id],
    );

    const post = rows[0];

    if (!post) {
      fail('NOT_FOUND', 'Report not found.', 404);
    }

    if (post.authorId !== u.id) {
      fail('FORBIDDEN', 'Only the report author can add updates.', 403);
    }

    const inserted: any[] = await this.db.query(
      `INSERT INTO "PostUpdate"
       (
         "postId",
         "authorId",
         title,
         content,
         "lifecycleStatus",
         "updatedAt"
       )
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [id, u.id, i.title, i.content, i.lifecycleStatus],
    );

    const update = inserted[0];

    for (const media of i.media || []) {
      await this.db.query(
        `INSERT INTO "PostUpdateMedia"
         (
           "postUpdateId",
           type,
           url,
           "thumbnailUrl",
           alt,
           position,
           provider,
           "objectKey",
           metadata,
           "updatedAt"
         )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,
        [
          update.id,
          media.type,
          media.url,
          media.thumbnailUrl ?? null,
          media.alt,
          media.position,
          media.provider ?? null,
          media.objectKey ?? null,
          media.metadata ?? null,
        ],
      );
    }

    await this.db.query(
      `UPDATE "Post"
       SET "lifecycleStatus" = $2, "updatedAt" = NOW()
       WHERE id = $1`,
      [id, i.lifecycleStatus],
    );

    return {
      id: update.id,
      title: update.title,
      content: update.content,
      lifecycleStatus: update.lifecycleStatus,
      createdAt: new Date(update.createdAt).toISOString(),
      media: i.media || [],
    };
  }

  async moderate(id: string, action: string, _note?: string) {
    const rows: any[] = await this.db.query(
      `SELECT * FROM "Post" WHERE id = $1`,
      [id],
    );

    if (!rows[0]) {
      fail('NOT_FOUND', 'Report not found.', 404);
    }

    const statusMap: Record<string, string> = {
      PUBLISH: 'PUBLISHED',
      HIDE: 'HIDDEN',
      REMOVE: 'REMOVED',
      RESTORE: 'PUBLISHED',
    };

    const status = statusMap[action];

    if (!status) {
      fail('BAD_REQUEST', 'Unsupported moderation action.');
    }

    await this.db.query(
      `UPDATE "Post"
       SET "publicationStatus" = $2,
           "publishedAt" = CASE
             WHEN $2 = 'PUBLISHED' THEN COALESCE("publishedAt", NOW())
             ELSE "publishedAt"
           END,
           "updatedAt" = NOW()
       WHERE id = $1`,
      [id, status],
    );

    return this.loadPublicById(id);
  }

  async pending() {
    const rows: IdRow[] = await this.db.query(
      `SELECT id
       FROM "Post"
       WHERE "publicationStatus" = 'PENDING_REVIEW'
         AND "deletedAt" IS NULL
       ORDER BY "createdAt" ASC`,
    );

    const result: any[] = [];

    for (const row of rows) {
      result.push(await this.loadPublicById(row.id));
    }

    return result;
  }

  async loadPublicById(id: string) {
    const rows: any[] = await this.db.query(
      `SELECT * FROM "Post" WHERE id = $1`,
      [id],
    );

    const post = rows[0];

    if (!post) return null;

    const authors: any[] = await this.db.query(
      `SELECT
         u.*,
         p.username,
         p."displayName",
         p.bio,
         p."avatarUrl"
       FROM "User" u
       LEFT JOIN "UserProfile" p ON p."userId" = u.id
       WHERE u.id = $1`,
      [post.authorId],
    );

    const author = authors[0];

    post.author = {
      ...author,
      profile: author?.username
        ? {
          username: author.username,
          displayName: author.displayName,
          bio: author.bio,
          avatarUrl: author.avatarUrl,
        }
        : null,
    };

    const categories: any[] = await this.db.query(
      `SELECT * FROM "PostCategory" WHERE id = $1`,
      [post.categoryId],
    );

    post.category = categories[0];

    const locations: any[] = await this.db.query(
      `SELECT * FROM "PostLocation" WHERE "postId" = $1`,
      [id],
    );

    post.location = locations[0] || null;

    post.media = await this.db.query(
      `SELECT *
       FROM "PostMedia"
       WHERE "postId" = $1
       ORDER BY position`,
      [id],
    );

    const updates: any[] = await this.db.query(
      `SELECT *
       FROM "PostUpdate"
       WHERE "postId" = $1 AND "deletedAt" IS NULL
       ORDER BY "createdAt" DESC`,
      [id],
    );

    for (const update of updates) {
      update.media = await this.db.query(
        `SELECT *
         FROM "PostUpdateMedia"
         WHERE "postUpdateId" = $1
         ORDER BY position`,
        [update.id],
      );
    }

    post.updates = updates;

    const comments: { n: number }[] = await this.db.query(
      `SELECT COUNT(*)::int AS n
       FROM "Comment"
       WHERE "postId" = $1 AND "deletedAt" IS NULL`,
      [id],
    );

    const bookmarks: { n: number }[] = await this.db.query(
      `SELECT COUNT(*)::int AS n
       FROM "Bookmark"
       WHERE "postId" = $1`,
      [id],
    );

    post._count = {
      comments: Number(comments[0].n),
      bookmarks: Number(bookmarks[0].n),
    };

    return publicPost(post);
  }

  private async saveLocation(id: string, location: any) {
    await this.db.query(
      `INSERT INTO "PostLocation"
       (
         "postId",
         country,
         state,
         city,
         locality,
         latitude,
         longitude,
         precision,
         "updatedAt"
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
      [
        id,
        location.country,
        location.state ?? null,
        location.city ?? null,
        location.locality ?? null,
        location.latitude ?? null,
        location.longitude ?? null,
        location.precision || 'LOCALITY',
      ],
    );
  }

  private async saveMedia(id: string, media: any) {
    await this.db.query(
      `INSERT INTO "PostMedia"
       (
         "postId",
         type,
         url,
         "thumbnailUrl",
         alt,
         position,
         provider,
         "objectKey",
         metadata,
         "updatedAt"
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,
      [
        id,
        media.type,
        media.url,
        media.thumbnailUrl ?? null,
        media.alt,
        media.position,
        media.provider ?? null,
        media.objectKey ?? null,
        media.metadata ?? null,
      ],
    );
  }

  private async uniqueSlug(title: string) {
    const base =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80) || 'report';

    let slug = base;

    for (let i = 0; i < 10; i++) {
      const rows: { exists: number }[] = await this.db.query(
        `SELECT 1 AS exists FROM "Post" WHERE slug = $1`,
        [slug],
      );

      if (!rows.length) return slug;

      slug = `${base}-${Date.now().toString(36)}-${i}`;
    }

    return `${base}-${Date.now().toString(36)}`;
  }
}
