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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const api_1 = require("../common/api");
let ReportsService = class ReportsService {
    constructor(db) {
        this.db = db;
    }
    async create(input, user) { const table = input.contentType === 'post' ? 'Post' : 'Comment', field = input.contentType === 'post' ? 'postId' : 'commentId'; if (!(await this.db.query(`SELECT id FROM "${table}" WHERE id=$1 AND "deletedAt" IS NULL`, [input.contentId])).length)
        (0, api_1.fail)('NOT_FOUND', 'Report target not found.', 404); if ((await this.db.query(`SELECT id FROM "ContentReport" WHERE "reporterId"=$1 AND "${field}"=$2 AND status='OPEN'`, [user.id, input.contentId])).length)
        (0, api_1.fail)('CONFLICT', 'You already have an active report for this content.', 409); const r = (await this.db.query(`INSERT INTO "ContentReport" ("reporterId","${field}",reason,note,"updatedAt") VALUES ($1,$2,$3,$4,NOW()) RETURNING id`, [user.id, input.contentId, input.reason, input.note ?? null]))[0]; return { id: r.id }; }
    async listOpen() { return this.db.query(`SELECT r.*,json_build_object('id',u.id,'mobile',u.mobile,'username',p.username,'displayName',p."displayName") reporter,json_build_object('id',po.id,'slug',po.slug,'title',po.title) post,json_build_object('id',c.id,'postId',c."postId",'content',c.content) comment FROM "ContentReport" r JOIN "User" u ON u.id=r."reporterId" LEFT JOIN "UserProfile" p ON p."userId"=u.id LEFT JOIN "Post" po ON po.id=r."postId" LEFT JOIN "Comment" c ON c.id=r."commentId" WHERE r.status='OPEN' ORDER BY r."createdAt" ASC`); }
    async review(id, action, note, user) { const r = (await this.db.query(`UPDATE "ContentReport" SET status=$2,"reviewedById"=$3,"reviewedAt"=NOW(),"reviewerNote"=$4,"updatedAt"=NOW() WHERE id=$1 RETURNING id,status`, [id, action === 'DISMISS_REPORT' ? 'DISMISSED' : 'REVIEWED', user.id, note ?? null]))[0]; if (!r)
        (0, api_1.fail)('NOT_FOUND', 'Report not found.', 404); return r; }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ReportsService);
//# sourceMappingURL=reports.service.js.map