export function publicProfile(user: any, count = 0) {
  const p = user?.profile;
  if (!user?.id || !p?.username) return null;
  return { id: user.id, username: p.username, displayName: p.displayName ?? null, bio: p.bio ?? null, avatarUrl: p.avatarUrl ?? null, joinedAt: user.createdAt.toISOString(), publicPostCount: count };
}
export function publicComment(comment: any) { return { id: comment.id, postId: comment.postId, parentId: comment.parentId, content: comment.content, createdAt: comment.createdAt.toISOString(), updatedAt: comment.updatedAt.toISOString(), author: publicProfile(comment.author) }; }
export function publicPost(post: any) {
  const visibility = post.authorVisibility;
  return {
    id: post.id, slug: post.slug, authorVisibility: visibility, title: post.title, summary: post.summary, body: post.body,
    category: post.category.value, publicationStatus: post.publicationStatus, lifecycleStatus: post.lifecycleStatus,
    location: post.location ? { latitude: post.location.latitude === null ? null : Number(post.location.latitude), longitude: post.location.longitude === null ? null : Number(post.location.longitude), locality: post.location.locality ?? null, city: post.location.city ?? null, state: post.location.state ?? null, country: post.location.country, precision: post.location.precision } : null,
    media: (post.media ?? []).map((m: any) => ({ id: m.id, type: m.type, url: m.url, thumbnailUrl: m.thumbnailUrl ?? undefined, alt: m.alt, position: m.position })),
    incidentDate: post.incidentDate?.toISOString() ?? null, createdAt: post.createdAt.toISOString(), updatedAt: post.updatedAt.toISOString(),
    commentCount: post._count?.comments ?? post.comments?.length ?? 0, bookmarkCount: post._count?.bookmarks ?? post.bookmarks?.length ?? 0, shareCount: 0,
    updates: (post.updates ?? []).map((u: any) => ({ id: u.id, title: u.title, content: u.content, media: (u.media ?? []).map((m: any) => ({ id: m.id, type: m.type, url: m.url, thumbnailUrl: m.thumbnailUrl ?? undefined, alt: m.alt, position: m.position })), lifecycleStatus: u.lifecycleStatus, createdAt: u.createdAt.toISOString() })),
    author: visibility === 'ANONYMOUS' ? null : publicProfile(post.author),
  };
}
