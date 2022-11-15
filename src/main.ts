import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/any-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import corsOptionsDelegate from './utils/cors';
import { LoggerMiddleware } from './middlewares/logger.middleware';

const whiteList = ['http://localhost:3000'];

async function bootstrap() {
  // const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  app.use(LoggerMiddleware);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  // {
  //   origin: whiteList,
  //   credentials: false,
  //   methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  // }
  app.enableCors({
    origin: whiteList,
    credentials: false,
  });
  const port = 3001;
  await app.listen(port, '0.0.0.0');

  // logger.log(`Running on http://localhost:${port}`);
}
bootstrap();
