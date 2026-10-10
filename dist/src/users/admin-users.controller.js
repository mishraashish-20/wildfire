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
exports.AdminUsersController = void 0;
const common_1 = require("@nestjs/common");
const auth_types_1 = require("../auth/auth.types");
const auth_guards_1 = require("../auth/auth.guards");
const zod_validation_pipe_1 = require("../common/zod-validation.pipe");
const schemas_1 = require("../common/schemas");
const api_1 = require("../common/api");
const admin_users_service_1 = require("./admin-users.service");
let AdminUsersController = class AdminUsersController {
    constructor(service) {
        this.service = service;
    }
    list() { return this.service.list().then(api_1.ok); }
    updateRole(id, body, req) {
        return this.service.updateRole(id, body.role, (0, auth_guards_1.authUser)(req).id).then(api_1.ok);
    }
    updateStatus(id, body, req) {
        return this.service.updateStatus(id, body.status, (0, auth_guards_1.authUser)(req).id).then(api_1.ok);
    }
};
exports.AdminUsersController = AdminUsersController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "list", null);
__decorate([
    (0, common_1.Patch)(':userId/role'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(schemas_1.roleUpdateSchema))),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Patch)(':userId/status'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(schemas_1.userStatusUpdateSchema))),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "updateStatus", null);
exports.AdminUsersController = AdminUsersController = __decorate([
    (0, common_1.Controller)('api/v1/admin/users'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard, auth_guards_1.RolesGuard),
    (0, auth_guards_1.Roles)(auth_types_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [admin_users_service_1.AdminUsersService])
], AdminUsersController);
//# sourceMappingURL=admin-users.controller.js.map