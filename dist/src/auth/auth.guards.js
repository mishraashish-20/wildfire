"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = exports.AuthGuard = exports.OptionalAuthGuard = exports.Roles = exports.ROLES_KEY = exports.authUser = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_service_1 = require("./auth.service");
const api_1 = require("../common/api");
const authUser = (req) => req.user;
exports.authUser = authUser;
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
const tokenFromRequest = (req) => { const token = req.cookies?.[process.env.SESSION_COOKIE_NAME || 'wildfire_session']; if (token)
    return token; const h = req.headers.authorization; return h?.startsWith('Bearer ') ? h.slice(7).trim() : undefined; };
let OptionalAuthGuard = class OptionalAuthGuard {
    constructor(auth) {
        this.auth = auth;
    }
    async canActivate(c) { const req = c.switchToHttp().getRequest(); req.user = await this.auth.getUserByToken(tokenFromRequest(req)); return true; }
};
exports.OptionalAuthGuard = OptionalAuthGuard;
exports.OptionalAuthGuard = OptionalAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], OptionalAuthGuard);
let AuthGuard = class AuthGuard {
    constructor(auth) {
        this.auth = auth;
    }
    async canActivate(c) { const req = c.switchToHttp().getRequest(); const u = await this.auth.getUserByToken(tokenFromRequest(req)); if (!u)
        (0, api_1.fail)('UNAUTHENTICATED', 'Sign in to continue.', 401); req.user = u; return true; }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthGuard);
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(c) { const roles = this.reflector.getAllAndOverride(exports.ROLES_KEY, [c.getHandler(), c.getClass()]); if (!roles?.length)
        return true; const u = c.switchToHttp().getRequest().user; if (!u || !roles.includes(u.role))
        (0, api_1.fail)('FORBIDDEN', 'You do not have permission to perform this action.', 403); return true; }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
//# sourceMappingURL=auth.guards.js.map