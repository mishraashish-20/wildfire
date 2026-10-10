"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const auth_guards_1 = require("../src/auth/auth.guards");
const context = (role) => ({
    getHandler: () => function handler() { },
    getClass: () => class Test {
    },
    switchToHttp: () => ({ getRequest: () => ({ user: role ? { role } : undefined }) }),
});
describe('Authorization', () => {
    it('allows a role declared by @Roles', () => {
        const reflector = new core_1.Reflector();
        const guard = new auth_guards_1.RolesGuard(reflector);
        const handler = context('ADMIN');
        Reflect.defineMetadata('roles', ['ADMIN'], handler.getHandler());
        expect(guard.canActivate(handler)).toBe(true);
    });
    it('rejects an unauthorized role', () => {
        const reflector = new core_1.Reflector();
        const guard = new auth_guards_1.RolesGuard(reflector);
        const handler = context('USER');
        Reflect.defineMetadata('roles', ['ADMIN'], handler.getHandler());
        expect(() => guard.canActivate(handler)).toThrow();
    });
    it('allows endpoints without role metadata', () => {
        const reflector = new core_1.Reflector();
        const guard = new auth_guards_1.RolesGuard(reflector);
        expect(guard.canActivate(context('USER'))).toBe(true);
    });
});
//# sourceMappingURL=auth-authorization.spec.js.map