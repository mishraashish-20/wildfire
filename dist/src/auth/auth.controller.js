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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const auth_guards_1 = require("./auth.guards");
const zod_validation_pipe_1 = require("../common/zod-validation.pipe");
const schemas_1 = require("../common/schemas");
const api_1 = require("../common/api");
const cookieName = () => process.env.SESSION_COOKIE_NAME || 'wildfire_session';
const cookieOptions = (expires) => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    ...(expires ? { expires } : {}),
});
let AuthController = class AuthController {
    constructor(auth) {
        this.auth = auth;
    }
    async register(body, res) {
        const result = await this.auth.register(body);
        res.cookie(cookieName(), result.token.token, cookieOptions(result.token.expiresAt));
        return (0, api_1.ok)(result.user);
    }
    async login(body, res) {
        const result = await this.auth.login(body);
        res.cookie(cookieName(), result.token.token, cookieOptions(result.token.expiresAt));
        return (0, api_1.ok)(result.user);
    }
    async logout(req, res) {
        await this.auth.revoke(this.tokenFromRequest(req));
        res.clearCookie(cookieName(), cookieOptions());
        return (0, api_1.ok)(null);
    }
    async logoutAll(req, res) {
        await this.auth.revokeAll((0, auth_guards_1.authUser)(req).id);
        res.clearCookie(cookieName(), cookieOptions());
        return (0, api_1.ok)(null);
    }
    async me(req) {
        const user = (0, auth_guards_1.authUser)(req);
        return (0, api_1.ok)({
            user,
            permissions: this.auth.permissions(user.role),
        });
    }
    async permissions(req) {
        const user = (0, auth_guards_1.authUser)(req);
        return (0, api_1.ok)({
            role: user.role,
            permissions: this.auth.permissions(user.role),
        });
    }
    async changePassword(body, req, res) {
        await this.auth.changePassword((0, auth_guards_1.authUser)(req).id, body.currentPassword, body.newPassword);
        res.clearCookie(cookieName(), cookieOptions());
        return (0, api_1.ok)({
            message: 'Password changed successfully. Please sign in again.',
        });
    }
    tokenFromRequest(req) {
        const cookieToken = req.cookies?.[cookieName()];
        if (cookieToken)
            return cookieToken;
        const header = req.headers.authorization;
        return header?.startsWith('Bearer ')
            ? header.slice(7).trim()
            : undefined;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new user' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['mobile', 'password'],
            properties: {
                mobile: { type: 'string', example: '9876543210' },
                password: { type: 'string', format: 'password', example: 'StrongPassword123!' },
                username: { type: 'string', example: 'ashish' },
                displayName: { type: 'string', example: 'Ashish' },
                email: { type: 'string', format: 'email', example: 'user@example.com' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Account created; session cookie set.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Mobile number or email already exists.' }),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(schemas_1.registerSchema))),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Login using mobile number and password' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['mobile', 'password'],
            properties: {
                mobile: { type: 'string', example: '9876543210' },
                password: { type: 'string', format: 'password', example: 'StrongPassword123!' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login successful; session cookie set.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials.' }),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(schemas_1.loginSchema))),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Logout current session' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('logout-all'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Logout all sessions for current user' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutAll", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get current authenticated user' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.Get)('permissions'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get permissions for current user' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "permissions", null);
__decorate([
    (0, common_1.Post)('change-password'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Change current user password' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['currentPassword', 'newPassword'],
            properties: {
                currentPassword: { type: 'string', format: 'password' },
                newPassword: { type: 'string', format: 'password' },
            },
        },
    }),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(schemas_1.changePasswordSchema))),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('api/v1/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map