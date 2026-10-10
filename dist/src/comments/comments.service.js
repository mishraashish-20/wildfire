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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const api_1 = require("../common/api");
let CommentsService = class CommentsService {
    constructor(db) {
        this.db = db;
    }
    async list(postId) { const exists = await this.db.query(`SELECT id FROM "Post" WHERE id=$1 AND "publicationStatus"='PUBLISHED' AND "deletedAt" IS NULL`, [postId]); if (!exists.length)
        (0, api_1.fail)('NOT_FOUND', 'Report not found.', 404); return this.db.query(`SELECT c.id,c."postId",c."parentId",c.content,c."createdAt",c."updatedAt",json_build_object('id',u.id,'username',p.username,'displayName',p."displayName",'bio',p.bio,'avatarUrl',p."avatarUrl",'joinedAt',u."createdAt") AS author FROM "Comment" c JOIN "User" u ON u.id=c."authorId" JOIN "UserProfile" p ON p."userId"=u.id WHERE c."postId"=$1 AND c."deletedAt" IS NULL ORDER BY c."createdAt" ASC`, [postId]); }
    async create(postId, content, user, parentId = null) { const p = await this.db.query(`SELECT id FROM "Post" WHERE id=$1 AND "publicationStatus"='PUBLISHED' AND "deletedAt" IS NULL`, [postId]); if (!p.length)
        (0, api_1.fail)('NOT_FOUND', 'Report not found.', 404); if (parentId && !((await this.db.query(`SELECT id FROM "Comment" WHERE id=$1 AND "postId"=$2 AND "parentId" IS NULL AND "deletedAt" IS NULL`, [parentId, postId])).length))
        (0, api_1.fail)('NOT_FOUND', 'Comment not found.', 404); const r = (await this.db.query(`INSERT INTO "Comment" ("postId","authorId",content,"parentId","updatedAt") VALUES ($1,$2,$3,$4,NOW()) RETURNING *`, [postId, user.id, content, parentId]))[0]; return { ...r, createdAt: new Date(r.createdAt).toISOString(), updatedAt: new Date(r.updatedAt).toISOString(), author: { id: user.id, username: user.username, displayName: user.displayName } }; }
    async reply(id, content, user) { const p = (await this.db.query(`SELECT id,"postId" FROM "Comment" WHERE id=$1 AND "parentId" IS NULL AND "deletedAt" IS NULL`, [id]))[0]; if (!p)
        (0, api_1.fail)('NOT_FOUND', 'Comment not found.', 404); return this.create(p.postId, content, user, id); }
    async update(id, content, user) { const c = (await this.db.query(`SELECT * FROM "Comment" WHERE id=$1 AND "deletedAt" IS NULL`, [id]))[0]; if (!c)
        (0, api_1.fail)('NOT_FOUND', 'Comment not found.', 404); if (c.authorId !== user.id)
        (0, api_1.fail)('FORBIDDEN', 'You can only edit your own comment.', 403); await this.db.query(`UPDATE "Comment" SET content=$2,"updatedAt"=NOW() WHERE id=$1`, [id, content]); return { ...c, content, updatedAt: new Date().toISOString() }; }
    async remove(id, user) { const c = (await this.db.query(`SELECT * FROM "Comment" WHERE id=$1`, [id]))[0]; if (!c)
        (0, api_1.fail)('NOT_FOUND', 'Comment not found.', 404); if (c.authorId !== user.id && !['MODERATOR', 'ADMIN'].includes(user.role))
        (0, api_1.fail)('FORBIDDEN', 'You cannot delete this comment.', 403); await this.db.query(`UPDATE "Comment" SET "deletedAt"=NOW(),"updatedAt"=NOW() WHERE id=$1`, [id]); return null; }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], CommentsService);
//# sourceMappingURL=comments.service.js.map