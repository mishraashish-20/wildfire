export const UserRole = {
  USER: 'USER',
  MODERATOR: 'MODERATOR',
  ADMIN: 'ADMIN',
} as const;

export type UserRole =
  (typeof UserRole)[keyof typeof UserRole];

export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'DELETED';

export interface AuthenticatedUser {
  id: string;
  role: UserRole;
  mobile: string;
  username: string;
  displayName: string | null;
  joinedAt: string;
}