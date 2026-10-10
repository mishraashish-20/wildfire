# Connecting the existing Next.js frontend

The current frontend calls relative paths such as `/api/v1/posts`. A separately hosted NestJS service needs a base URL and cookies enabled.

## Recommended adapter change

Add:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

Then update `src/features/shared/api/http-client.ts` so the request URL is:

```ts
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const response = await fetch(`${baseUrl}${path}`, {
  ...init,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    ...(init?.headers ?? {}),
  },
});
```

For production, use the real HTTPS API origin. Keep `FRONTEND_ORIGIN` in the NestJS environment equal to the exact frontend origin.

## Important

Do not move Prisma imports into the Next.js frontend. The frontend should continue to use its API adapters only.
