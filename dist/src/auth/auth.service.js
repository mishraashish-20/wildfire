"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const node_crypto_1 = require("node:crypto");
const api_1 = require("../common/api");
let AuthService = class AuthService {
    constructor(db) {
        this.db = db;
        this.days = Number(process.env.SESSION_DAYS ?? 30);
    }
    normalizeMobile(v) { return v.replace(/[\s()-]/g, ''); }
    hashToken(v) { return (0, node_crypto_1.createHash)('sha256').update(v).digest('hex'); }
    async register(input) { const mobile = this.normalizeMobile(input.mobile); if ((await this.db.query(`SELECT 1 FROM "User" WHERE mobile=$1 AND "deletedAt" IS NULL`, [mobile])).length)
        (0, api_1.fail)('CONFLICT', 'An account already exists for this mobile number.', 409); const email = input.email?.toLowerCase() ?? null; if (email && (await this.db.query(`SELECT 1 FROM "User" WHERE email=$1`, [email])).length)
        (0, api_1.fail)('CONFLICT', 'An account already exists for this email.', 409); let username = input.username?.toLowerCase() || this.slug(input.displayName || 'user'); if ((await this.db.query(`SELECT 1 FROM "UserProfile" WHERE username=$1`, [username])).length)
        username += `_${(0, node_crypto_1.randomBytes)(2).toString('hex')}`; const id = (await this.db.query(`INSERT INTO "User" (mobile,email,"passwordHash","updatedAt") VALUES ($1,$2,$3,NOW()) RETURNING id,mobile,email,role,"createdAt"`, [mobile, email, await bcrypt.hash(input.password, 12)]))[0]; const profile = (await this.db.query(`INSERT INTO "UserProfile" ("userId",username,"displayName","updatedAt") VALUES ($1,$2,$3,NOW()) RETURNING username,"displayName"`, [id.id, username, input.displayName ?? null]))[0]; return { user: { id: id.id, mobile: id.mobile, email: id.email, role: id.role, username: profile.username, displayName: profile.displayName, joinedAt: new Date(id.createdAt).toISOString() }, token: await this.createSession(id.id) }; }
    async login(input) { const rows = await this.db.query(`SELECT u.*,p.username,p."displayName" FROM "User" u LEFT JOIN "UserProfile" p ON p."userId"=u.id WHERE u.mobile=$1`, [this.normalizeMobile(input.mobile)]); const u = rows[0]; if (!u || u.status !== 'ACTIVE' || u.deletedAt || !(await bcrypt.compare(input.password, u.passwordHash)))
        (0, api_1.fail)('UNAUTHENTICATED', 'Invalid mobile number or password.', 401); return { user: { id: u.id, mobile: u.mobile, email: u.email, role: u.role, username: u.username || '', displayName: u.displayName, joinedAt: new Date(u.createdAt).toISOString() }, token: await this.createSession(u.id) }; }
    async createSession(userId) { const token = (0, node_crypto_1.randomBytes)(32).toString('base64url'), expiresAt = new Date(Date.now() + this.days * 86400000); await this.db.query(`INSERT INTO "UserSession" ("userId","tokenHash","expiresAt","updatedAt") VALUES ($1,$2,$3,NOW())`, [userId, this.hashToken(token), expiresAt]); return { token, expiresAt }; }
    async revoke(token) { if (token)
        await this.db.query(`UPDATE "UserSession" SET "revokedAt"=NOW(),"updatedAt"=NOW() WHERE "tokenHash"=$1 AND "revokedAt" IS NULL`, [this.hashToken(token)]); }
    async revokeAll(userId) { await this.db.query(`UPDATE "UserSession" SET "revokedAt"=NOW(),"updatedAt"=NOW() WHERE "userId"=$1 AND "revokedAt" IS NULL`, [userId]); }
    async changePassword(id, current, next) { const u = (await this.db.query(`SELECT "passwordHash" FROM "User" WHERE id=$1`, [id]))[0]; if (!u || !(await bcrypt.compare(current, u.passwordHash)))
        (0, api_1.fail)('UNAUTHENTICATED', 'Current password is incorrect.', 401); await this.db.query(`UPDATE "User" SET "passwordHash"=$2,"updatedAt"=NOW() WHERE id=$1`, [id, await bcrypt.hash(next, 12)]); await this.revokeAll(id); }
    async getUserByToken(token) { if (!token)
        return null; const rows = await this.db.query(`SELECT u.id,u.role,u.mobile,u."createdAt",p.username,p."displayName" FROM "UserSession" s JOIN "User" u ON u.id=s."userId" JOIN "UserProfile" p ON p."userId"=u.id WHERE s."tokenHash"=$1 AND s."revokedAt" IS NULL AND s."expiresAt">NOW() AND u.status='ACTIVE' AND u."deletedAt" IS NULL`, [this.hashToken(token)]); const u = rows[0]; return u ? { id: u.id, role: u.role, mobile: u.mobile, username: u.username, displayName: u.displayName, joinedAt: new Date(u.createdAt).toISOString() } : null; }
    permissions(role) { return { USER: ['posts:create', 'posts:update:own', 'posts:delete:own', 'comments:create', 'comments:update:own', 'comments:delete:own', 'bookmarks:manage', 'reports:create'], MODERATOR: ['posts:create', 'posts:update:own', 'posts:delete:any', 'comments:delete:any', 'bookmarks:manage', 'reports:create', 'moderation:review'], ADMIN: ['*'] }[role]; }
    slug(v) { return v.toLowerCase().replace(/[^a-z0-9_]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 32) || 'user'; }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AuthService);
//# sourceMappingURL=auth.service.js.map