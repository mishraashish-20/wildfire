"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const posts_module_1 = require("./posts/posts.module");
const bookmarks_module_1 = require("./bookmarks/bookmarks.module");
const moderation_module_1 = require("./moderation/moderation.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [
                    auth_module_1.AuthModule,
                    config_1.ConfigModule,
                    posts_module_1.PostsModule,
                    bookmarks_module_1.BookmarksModule,
                    moderation_module_1.ModerationModule,
                ],
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    const url = config.get('DATABASE_URL');
                    if (!url) {
                        throw new Error('DATABASE_URL is missing from .env');
                    }
                    return {
                        type: 'postgres',
                        url,
                        autoLoadEntities: true,
                        synchronize: false,
                    };
                },
            }),
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map