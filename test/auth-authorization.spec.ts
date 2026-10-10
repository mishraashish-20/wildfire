import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../src/auth/auth.types';
import { Roles, RolesGuard } from '../src/auth/auth.guards';

const context = (role?: UserRole) => ({
  getHandler: () => function handler() {},
  getClass: () => class Test {},
  switchToHttp: () => ({ getRequest: () => ({ user: role ? { role } : undefined }) }),
}) as unknown as ExecutionContext;

describe('Authorization', () => {
  it('allows a role declared by @Roles', () => {
    const reflector = new Reflector();
    const guard = new RolesGuard(reflector);
    const handler = context('ADMIN');
    Reflect.defineMetadata('roles', ['ADMIN'], handler.getHandler());
    expect(guard.canActivate(handler)).toBe(true);
  });

  it('rejects an unauthorized role', () => {
    const reflector = new Reflector();
    const guard = new RolesGuard(reflector);
    const handler = context('USER');
    Reflect.defineMetadata('roles', ['ADMIN'], handler.getHandler());
    expect(() => guard.canActivate(handler)).toThrow();
  });

  it('allows endpoints without role metadata', () => {
    const reflector = new Reflector();
    const guard = new RolesGuard(reflector);
    expect(guard.canActivate(context('USER'))).toBe(true);
  });
});
