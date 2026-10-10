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
exports.BookmarksController = void 0;
const common_1 = require("@nestjs/common");
const bookmarks_service_1 = require("./bookmarks.service");
const auth_guards_1 = require("../auth/auth.guards");
const api_1 = require("../common/api");
let BookmarksController = class BookmarksController {
    constructor(service) {
        this.service = service;
    }
    async list(req) { return (0, api_1.ok)(await this.service.list((0, auth_guards_1.authUser)(req))); }
    async add(id, req) { return (0, api_1.ok)(await this.service.add(id, (0, auth_guards_1.authUser)(req))); }
    async remove(id, req) { return (0, api_1.ok)(await this.service.remove(id, (0, auth_guards_1.authUser)(req))); }
};
exports.BookmarksController = BookmarksController;
__decorate([
    (0, common_1.Get)('bookmarks'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookmarksController.prototype, "list", null);
__decorate([
    (0, common_1.Put)('posts/:postId/bookmark'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookmarksController.prototype, "add", null);
__decorate([
    (0, common_1.Delete)('posts/:postId/bookmark'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookmarksController.prototype, "remove", null);
exports.BookmarksController = BookmarksController = __decorate([
    (0, common_1.Controller)('api/v1'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __metadata("design:paramtypes", [bookmarks_service_1.BookmarksService])
], BookmarksController);
//# sourceMappingURL=bookmarks.controller.js.map