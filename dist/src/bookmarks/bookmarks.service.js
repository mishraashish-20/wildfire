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
exports.BookmarksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const api_1 = require("../common/api");
const posts_service_1 = require("../posts/posts.service");
let BookmarksService = class BookmarksService {
    constructor(db, posts) {
        this.db = db;
        this.posts = posts;
    }
    async list(user) {
        const rows = await this.db.query(`SELECT b."postId"
       FROM "Bookmark" b
       JOIN "Post" p ON p.id = b."postId"
       WHERE b."userId" = $1
         AND p."deletedAt" IS NULL
         AND p."publicationStatus" = 'PUBLISHED'
       ORDER BY b."createdAt" DESC`, [user.id]);
        const posts = [];
        for (const row of rows) {
            posts.push(await this.posts.loadPublicById(row.postId));
        }
        return {
            postIds: rows.map((row) => row.postId),
            posts,
        };
    }
    async add(id, user) {
        const rows = await this.db.query(`SELECT id
       FROM "Post"
       WHERE id = $1
         AND "publicationStatus" = 'PUBLISHED'
         AND "deletedAt" IS NULL`, [id]);
        if (rows.length === 0) {
            (0, api_1.fail)('NOT_FOUND', 'Report not found.', 404);
        }
        await this.db.query(`INSERT INTO "Bookmark" ("userId", "postId")
       VALUES ($1, $2)
       ON CONFLICT ("userId", "postId") DO NOTHING`, [user.id, id]);
        return {
            postId: id,
            bookmarked: true,
        };
    }
    async remove(id, user) {
        await this.db.query(`DELETE FROM "Bookmark"
       WHERE "userId" = $1
         AND "postId" = $2`, [user.id, id]);
        return {
            postId: id,
            bookmarked: false,
        };
    }
};
exports.BookmarksService = BookmarksService;
exports.BookmarksService = BookmarksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        posts_service_1.PostsService])
], BookmarksService);
//# sourceMappingURL=bookmarks.service.js.map