export type UserRole = 'USER' | 'MODERATOR' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'DELETED';
export interface AuthenticatedUser { id:string; role:UserRole; mobile:string; username:string; displayName:string|null; joinedAt:string; }
