
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AuthenticatedUser } from '../auth/auth.types';
import { fail } from '../common/api';
import { PostsService } from '../posts/posts.service';

interface BookmarkRow {
  postId: string;
}

interface PostRow {
  id: string;
}

@Injectable()
export class BookmarksService {
  constructor(
    private readonly db: DataSource,
    private readonly posts: PostsService,
  ) { }

  async list(user: AuthenticatedUser) {
    const rows: BookmarkRow[] = await this.db.query(
      `SELECT b."postId"
       FROM "Bookmark" b
       JOIN "Post" p ON p.id = b."postId"
       WHERE b."userId" = $1
         AND p."deletedAt" IS NULL
         AND p."publicationStatus" = 'PUBLISHED'
       ORDER BY b."createdAt" DESC`,
      [user.id],
    );

    const posts = [];

    for (const row of rows) {
      posts.push(await this.posts.loadPublicById(row.postId));
    }

    return {
      postIds: rows.map((row) => row.postId),
      posts,
    };
  }

  async add(id: string, user: AuthenticatedUser) {
    const rows: PostRow[] = await this.db.query(
      `SELECT id
       FROM "Post"
       WHERE id = $1
         AND "publicationStatus" = 'PUBLISHED'
         AND "deletedAt" IS NULL`,
      [id],
    );

    if (rows.length === 0) {
      fail('NOT_FOUND', 'Report not found.', 404);
    }

    await this.db.query(
      `INSERT INTO "Bookmark" ("userId", "postId")
       VALUES ($1, $2)
       ON CONFLICT ("userId", "postId") DO NOTHING`,
      [user.id, id],
    );

    return {
      postId: id,
      bookmarked: true,
    };
  }

  async remove(id: string, user: AuthenticatedUser) {
    await this.db.query(
      `DELETE FROM "Bookmark"
       WHERE "userId" = $1
         AND "postId" = $2`,
      [user.id, id],
    );

    return {
      postId: id,
      bookmarked: false,
    };
  }
}
