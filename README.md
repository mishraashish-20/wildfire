# Wildfire NestJS Backend (TypeORM + PostgreSQL)

A NestJS REST API for civic reporting. This edition uses **TypeORM's PostgreSQL DataSource/query API** and does not require Prisma or `prisma generate`.

## Requirements
- Node.js 22 LTS recommended (Node 24 may work, but Node 22 is the project's Docker baseline)
- PostgreSQL 15+

## Run locally (Windows PowerShell)
1. Install PostgreSQL, or start Docker Desktop and run `docker compose up -d postgres`.
2. Copy `.env.example` to `.env` and confirm `DATABASE_URL` points to your database.
3. Install packages: `npm install`
4. Apply the initial schema: `npm run db:migrate`
5. Insert default categories: `npm run db:seed`
6. Start in watch mode: `npm run start:dev`
7. Open Swagger: `http://localhost:3001/docs`; health: `http://localhost:3001/health`.

No Prisma commands are used. If you have a previous Prisma-based database already created, the SQL schema is compatible with the included model structure; back up the database before running migrations against existing data. The migration is intended for a fresh database.

## API inventory
Base prefix: `/api/v1`

- Auth: `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `POST /auth/logout-all`, `POST /auth/change-password`, `GET /auth/me`, `GET /auth/permissions`
- Posts: `GET /posts`, `GET /posts/:slug`, `POST /posts`, `PATCH /posts/:postId`, `DELETE /posts/:postId`, `POST /posts/:postId/updates`
- Comments: `GET /posts/:postId/comments`, `POST /posts/:postId/comments`, `POST /comments/:commentId/replies`, `PATCH /comments/:commentId`, `DELETE /comments/:commentId`
- Bookmarks: `GET /bookmarks`, `PUT /posts/:postId/bookmark`, `DELETE /posts/:postId/bookmark`
- Reports: `POST /reports`
- Categories: `GET /categories`
- Profiles: `GET /profiles/:username`
- Current user: `GET /me/posts`
- Moderation: `GET /moderation/posts/pending`, `POST /moderation/posts/:postId/decision`, `GET /moderation/reports`, `POST /moderation/reports/:reportId/decision`
- Admin: `GET /admin/users`, `PATCH /admin/users/:userId/role`, `PATCH /admin/users/:userId/status`

## Authentication and authorization
Register/login return a session cookie (`wildfire_session` by default); API clients may instead send `Authorization: Bearer <session-token>`. Session tokens are random opaque tokens; only SHA-256 hashes are stored in PostgreSQL. Passwords are hashed with bcrypt. Logout revokes a session; logout-all and password changes revoke all sessions. Cookies are HttpOnly and Secure in production.

Roles:
- `USER`: create/edit own eligible posts, manage own bookmarks, comment, report content.
- `MODERATOR`: user capabilities plus moderation queue and content moderation.
- `ADMIN`: moderation plus user role/status administration.

Ownership checks are enforced in services. Do not expose this API directly to the public until you set production secrets, HTTPS, database credentials, CORS origins and operational rate limiting.

## Database
The schema migration is `database/migrations/001_init.sql`; migration tracking is stored in `_wildfire_migrations`. Seed categories with `npm run db:seed`. Raw SQL is executed through TypeORM's `DataSource`, keeping SQL parameterized for user-provided values.

## Bootstrap the first administrator
For safety, the seed script does not create a hard-coded administrator. Register a normal account, then promote it directly in your trusted PostgreSQL session:

```sql
UPDATE "User" SET role = 'ADMIN', "updatedAt" = NOW() WHERE mobile = '+91XXXXXXXXXX';
```

Replace the mobile number with the registered account's normalized mobile. Do not expose database credentials to the client.
