import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpErrorFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(helmet());
  app.enableCors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000', credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpErrorFilter());
  const swaggerConfig = new DocumentBuilder().setTitle('Wildfire API').setDescription('Wildfire civic reporting backend').setVersion('1.0.0').addCookieAuth(process.env.SESSION_COOKIE_NAME || 'wildfire_session').addBearerAuth().build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swaggerConfig));
  const port = Number(process.env.PORT || 3001);
  await app.listen(port);
  console.log(`Wildfire backend listening on http://localhost:${port}`);
}
bootstrap();
