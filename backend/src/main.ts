import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import passport from 'passport';
import session from 'express-session';
import { ConfigService } from '@nestjs/config';
import MySQLStore from 'express-mysql-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const sessionStore = new MySQLStore({
    host: configService.get<string>('MYSQL_HOST', 'localhost'),
    port: configService.get<number>('MYSQL_PORT', 32770),
    user: configService.get<string>('MYSQL_USER', 'root'),
    password: configService.get<string>(
      'MYSQL_PASSWORD',
      configService.get<string>('MYSQL_ROOT_PASSWORD'),
    ),
    database: configService.get<string>('MYSQL_DATABASE'),
  });

  app.use(
    session({
      secret: configService.get<string>('SECRET'),
      resave: false,
      saveUninitialized: false,
      rolling: true,
      store: sessionStore,
      cookie: {
        maxAge: 2628000000, // one month
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(4021);
}
bootstrap();
