import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Wildfire API')
    .setDescription('Wildfire civic reporting backend')
    .setVersion('1.0.0')
    .addCookieAuth(
      process.env.SESSION_COOKIE_NAME || 'wildfire_session',
      {
        type: 'apiKey',
        in: 'cookie',
      },
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = Number(process.env.PORT) || 3001;
  await app.listen(port, '0.0.0.0');
}

bootstrap();