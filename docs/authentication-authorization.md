# Authentication & Authorization

## Authentication

Wildfire uses secure server-side sessions.

1. `POST /api/v1/auth/register` creates a USER account and signs the user in.
2. `POST /api/v1/auth/login` signs an existing user in.
3. A cryptographically random 256-bit session token is created.
4. Only the SHA-256 hash of that token is stored in PostgreSQL.
5. Browser clients receive the token as an HttpOnly cookie.
6. API clients can send `Authorization: Bearer <token>`.
7. `POST /api/v1/auth/logout` revokes the current session.
8. `POST /api/v1/auth/logout-all` revokes all sessions for the current user.
9. `POST /api/v1/auth/change-password` changes the password and revokes all sessions.

## Authorization

Roles are stored in PostgreSQL and are never accepted during public registration.

| Role | Access |
|---|---|
| USER | Create content, manage own content/comments/bookmarks, submit reports |
| MODERATOR | USER capabilities plus moderation queues, report review, and moderation-level deletion |
| ADMIN | All moderator capabilities plus user role/status management |

NestJS authorization is implemented with `@Roles(...)` metadata and `RolesGuard`.

Examples:

- `GET /api/v1/moderation/posts/pending` requires `MODERATOR` or `ADMIN`.
- `POST /api/v1/moderation/posts/:postId/decision` requires `MODERATOR` or `ADMIN`.
- `GET /api/v1/admin/users` requires `ADMIN`.
- `PATCH /api/v1/admin/users/:userId/role` requires `ADMIN`.

Ownership checks remain in the service layer. For example, a USER cannot edit another user's post even though both users pass authentication.

## Auth API examples

### Register

`POST /api/v1/auth/register`

```json
{
  "mobile": "+919999000010",
  "password": "StrongPassword123",
  "username": "ashish",
  "displayName": "Ashish"
}
```

### Login

`POST /api/v1/auth/login`

```json
{
  "mobile": "+919999000010",
  "password": "StrongPassword123"
}
```

### Authenticated request with Bearer token

```http
Authorization: Bearer <session-token>
```

### Current identity

`GET /api/v1/auth/me`

Response contains:

```json
{
  "data": {
    "user": {
      "id": "...",
      "role": "USER",
      "username": "ashish"
    },
    "permissions": [
      "posts:create",
      "posts:update:own"
    ]
  }
}
```

Do not expose session tokens in logs, analytics, frontend localStorage, or error messages.
