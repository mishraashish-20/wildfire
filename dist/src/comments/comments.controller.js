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
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const comments_service_1 = require("./comments.service");
const auth_guards_1 = require("../auth/auth.guards");
const zod_validation_pipe_1 = require("../common/zod-validation.pipe");
const schemas_1 = require("../common/schemas");
const api_1 = require("../common/api");
let CommentsController = class CommentsController {
    constructor(service) {
        this.service = service;
    }
    async list(id) { return (0, api_1.ok)(await this.service.list(id)); }
    async create(id, body, req) { return (0, api_1.ok)(await this.service.create(id, body.content, (0, auth_guards_1.authUser)(req))); }
    async reply(id, body, req) { return (0, api_1.ok)(await this.service.reply(id, body.content, (0, auth_guards_1.authUser)(req))); }
    async update(id, body, req) { return (0, api_1.ok)(await this.service.update(id, body.content, (0, auth_guards_1.authUser)(req))); }
    async remove(id, req) { return (0, api_1.ok)(await this.service.remove(id, (0, auth_guards_1.authUser)(req))); }
};
exports.CommentsController = CommentsController;
__decorate([
    (0, common_1.Get)('posts/:postId/comments'),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('posts/:postId/comments'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(schemas_1.commentSchema))),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('comments/:commentId/replies'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, common_1.Param)('commentId')),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(schemas_1.commentSchema))),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "reply", null);
__decorate([
    (0, common_1.Patch)('comments/:commentId'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, common_1.Param)('commentId')),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(schemas_1.commentSchema))),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('comments/:commentId'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, common_1.Param)('commentId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "remove", null);
exports.CommentsController = CommentsController = __decorate([
    (0, common_1.Controller)('api/v1'),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
//# sourceMappingURL=comments.controller.js.map