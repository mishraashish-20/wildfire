# Wildfire API Contract

All API resources use `/api/v1`.

## Success envelope
```json
{ "data": {} }
```

## Error envelope
```json
{ "error": { "code": "NOT_FOUND", "message": "Report not found." } }
```

## Publication

`DRAFT` is private to its author. `PENDING_REVIEW` is private to its author until moderation. `PUBLISHED` is public. `HIDDEN` and `REMOVED` are not public.

## Anonymous posts

`Post.authorId` is retained internally. Public serialization returns `author: null` for anonymous posts. Public profiles exclude anonymous posts.
