import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UserRole } from './auth.types';
export declare const authUser: (req: Request) => any;
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: UserRole[]) => import("@nestjs/common").CustomDecorator<string>;
export declare class OptionalAuthGuard implements CanActivate {
    private readonly auth;
    constructor(auth: AuthService);
    canActivate(c: ExecutionContext): Promise<boolean>;
}
export declare class AuthGuard implements CanActivate {
    private readonly auth;
    constructor(auth: AuthService);
    canActivate(c: ExecutionContext): Promise<boolean>;
}
export declare class RolesGuard implements CanActivate {
    private readonly reflector;
    constructor(reflector: Reflector);
    canActivate(c: ExecutionContext): boolean;
}
