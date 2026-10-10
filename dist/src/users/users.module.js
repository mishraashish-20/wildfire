"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const posts_module_1 = require("../posts/posts.module");
const profiles_service_1 = require("./profiles.service");
const profiles_controller_1 = require("./profiles.controller");
const me_controller_1 = require("./me.controller");
const admin_users_controller_1 = require("./admin-users.controller");
const admin_users_service_1 = require("./admin-users.service");
const auth_module_1 = require("../auth/auth.module");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [posts_module_1.PostsModule, auth_module_1.AuthModule],
        controllers: [profiles_controller_1.ProfilesController, me_controller_1.MeController, admin_users_controller_1.AdminUsersController],
        providers: [profiles_service_1.ProfilesService, admin_users_service_1.AdminUsersService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map