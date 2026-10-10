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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const auth_guards_1 = require("../auth/auth.guards");
const zod_validation_pipe_1 = require("../common/zod-validation.pipe");
const schemas_1 = require("../common/schemas");
const api_1 = require("../common/api");
let PostsController = class PostsController {
    constructor(posts) {
        this.posts = posts;
    }
    async list(query) { return (0, api_1.ok)(await this.posts.list(query)); }
    detail(slug, req) { return this.posts.findBySlug(slug, (0, auth_guards_1.authUser)(req)).then(api_1.ok); }
    create(body, req) { return this.posts.create(body, (0, auth_guards_1.authUser)(req)).then(api_1.ok); }
    update(id, body, req) { return this.posts.update(id, body, (0, auth_guards_1.authUser)(req)).then(api_1.ok); }
    remove(id, req) { return this.posts.delete(id, (0, auth_guards_1.authUser)(req)).then(api_1.ok); }
    addUpdate(id, body, req) { return this.posts.addUpdate(id, body, (0, auth_guards_1.authUser)(req)).then(api_1.ok); }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new zod_validation_pipe_1.ZodValidationPipe(schemas_1.postFiltersSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':slug'),
    (0, common_1.UseGuards)(auth_guards_1.OptionalAuthGuard),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "detail", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(schemas_1.createPostSchema))),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':postId'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(schemas_1.updatePostSchema))),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':postId'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':postId/updates'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(schemas_1.updateSchema))),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "addUpdate", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)('api/v1/posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map