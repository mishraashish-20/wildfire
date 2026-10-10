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
exports.AdminUsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const api_1 = require("../common/api");
let AdminUsersService = class AdminUsersService {
    constructor(db) {
        this.db = db;
    }
    async list() { return this.db.query(`SELECT u.id,u.mobile,u.email,u.role,u.status,u."isMobileVerified",u."createdAt",u."updatedAt",json_build_object('username',p.username,'displayName',p."displayName") AS profile FROM "User" u LEFT JOIN "UserProfile" p ON p."userId"=u.id WHERE u."deletedAt" IS NULL ORDER BY u."createdAt" DESC`); }
    async updateRole(id, role, actor) { if (id === actor)
        (0, api_1.fail)('BAD_REQUEST', 'You cannot change your own role.', 400); const r = await this.db.query(`UPDATE "User" SET role=$2,"updatedAt"=NOW() WHERE id=$1 AND "deletedAt" IS NULL RETURNING id,mobile,email,role,status`, [id, role]); if (!r[0])
        (0, api_1.fail)('NOT_FOUND', 'User not found.', 404); return r[0]; }
    async updateStatus(id, status, actor) { if (id === actor)
        (0, api_1.fail)('BAD_REQUEST', 'You cannot change your own account status.', 400); const r = await this.db.query(`UPDATE "User" SET status=$2,"deletedAt"=CASE WHEN $2='DELETED' THEN NOW() ELSE NULL END,"updatedAt"=NOW() WHERE id=$1 AND "deletedAt" IS NULL RETURNING id,mobile,email,role,status`, [id, status]); if (!r[0])
        (0, api_1.fail)('NOT_FOUND', 'User not found.', 404); return r[0]; }
};
exports.AdminUsersService = AdminUsersService;
exports.AdminUsersService = AdminUsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AdminUsersService);
//# sourceMappingURL=admin-users.service.js.map