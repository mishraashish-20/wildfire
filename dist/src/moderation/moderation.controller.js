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
exports.ModerationController = void 0;
const common_1 = require("@nestjs/common");
const auth_types_1 = require("../auth/auth.types");
const auth_guards_1 = require("../auth/auth.guards");
const posts_service_1 = require("../posts/posts.service");
const reports_service_1 = require("../reports/reports.service");
const zod_validation_pipe_1 = require("../common/zod-validation.pipe");
const schemas_1 = require("../common/schemas");
const api_1 = require("../common/api");
let ModerationController = class ModerationController {
    constructor(posts, reports) {
        this.posts = posts;
        this.reports = reports;
    }
    async pending() { return (0, api_1.ok)(await this.posts.pending()); }
    async postDecision(id, body) {
        return (0, api_1.ok)(await this.posts.moderate(id, body.action, body.reviewerNote));
    }
    async reportsList() { return (0, api_1.ok)(await this.reports.listOpen()); }
    async reportDecision(id, body, req) {
        return (0, api_1.ok)(await this.reports.review(id, body.action, body.reviewerNote, (0, auth_guards_1.authUser)(req)));
    }
};
exports.ModerationController = ModerationController;
__decorate([
    (0, common_1.Get)('posts/pending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ModerationController.prototype, "pending", null);
__decorate([
    (0, common_1.Post)('posts/:postId/decision'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(schemas_1.moderationDecisionSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ModerationController.prototype, "postDecision", null);
__decorate([
    (0, common_1.Get)('reports'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ModerationController.prototype, "reportsList", null);
__decorate([
    (0, common_1.Post)('reports/:reportId/decision'),
    __param(0, (0, common_1.Param)('reportId')),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(schemas_1.moderationDecisionSchema))),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ModerationController.prototype, "reportDecision", null);
exports.ModerationController = ModerationController = __decorate([
    (0, common_1.Controller)('api/v1/moderation'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard, auth_guards_1.RolesGuard),
    (0, auth_guards_1.Roles)(auth_types_1.UserRole.MODERATOR, auth_types_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [posts_service_1.PostsService, reports_service_1.ReportsService])
], ModerationController);
//# sourceMappingURL=moderation.controller.js.map