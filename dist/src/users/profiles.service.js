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
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const api_1 = require("../common/api");
const posts_service_1 = require("../posts/posts.service");
let ProfilesService = class ProfilesService {
    constructor(db, posts) {
        this.db = db;
        this.posts = posts;
    }
    async get(username) { const u = (await this.db.query(`SELECT u.*,p.username,p."displayName",p.bio,p."avatarUrl" FROM "User" u JOIN "UserProfile" p ON p."userId"=u.id WHERE p.username=$1 AND u.status='ACTIVE' AND u."deletedAt" IS NULL`, [username]))[0]; if (!u)
        (0, api_1.fail)('NOT_FOUND', 'Profile not found.', 404); const rows = await this.db.query(`SELECT id FROM "Post" WHERE "authorId"=$1 AND "authorVisibility"='PUBLIC' AND "publicationStatus"='PUBLISHED' AND "deletedAt" IS NULL ORDER BY "createdAt" DESC`, [u.id]); const posts = []; for (const r of rows)
        posts.push(await this.posts.loadPublicById(r.id)); return { profile: { id: u.id, username: u.username, displayName: u.displayName, bio: u.bio, avatarUrl: u.avatarUrl, joinedAt: new Date(u.createdAt).toISOString(), publicPostCount: rows.length }, posts }; }
};
exports.ProfilesService = ProfilesService;
exports.ProfilesService = ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource, posts_service_1.PostsService])
], ProfilesService);
//# sourceMappingURL=profiles.service.js.map