"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Wildfire API')
        .setDescription('Wildfire civic reporting backend')
        .setVersion('1.0.0')
        .addCookieAuth(process.env.SESSION_COOKIE_NAME || 'wildfire_session', {
        type: 'apiKey',
        in: 'cookie',
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const port = Number(process.env.PORT) || 3001;
    await app.listen(port, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map