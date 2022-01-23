import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as redis from 'ioredis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://localhost:3000'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  app.use(helmet());
  app.use(cookieParser());
  // app.use(csurf({ cookie: true }));
  const R = new redis();
  global.Publisher = R;
  global.Subscriber = R.duplicate();
  global.Subscriber.subscribe('get-parsed-data');
  await app.listen(8000);
}
bootstrap();
