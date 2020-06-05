import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  await app.listen(4021);
}
bootstrap();
