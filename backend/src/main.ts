import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import {
  ClassSerializerInterceptor,
  ConsoleLogger,
  ValidationPipe,
} from '@nestjs/common';
import express from 'express';
import { join } from 'node:path';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AllExceptionsFilter } from './modules/common/filters/http-exception.filter';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'flipkart',
      colors: true,
      timestamp: true,
    }),
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: ['http://localhost:3000','http://localhost:3002'],
    credentials: true,
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use('/public', express.static(join(process.cwd(), 'public')));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((e) => console.log('Error Start the server:- ', e));
