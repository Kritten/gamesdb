import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModule } from './modules/game/game.module';
import { CategoryModule } from './modules/category/category.module';
import { MoodModule } from './modules/mood/mood.module';
import { PlayerModule } from './modules/player/player.module';
import { SessionModule } from './modules/session/session.module';
import { UniverseModule } from './modules/universe/universe.module';
import { UserModule } from './modules/user/user.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { MechanismModule } from './modules/mechanism/mechanism.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('MYSQL_HOST', 'localhost'),
        port: configService.get<number>('MYSQL_PORT', 32770),
        username: configService.get<string>('MYSQL_USER', 'root'),
        password: configService.get<string>(
          'MYSQL_PASSWORD',
          configService.get<string>('MYSQL_ROOT_PASSWORD'),
        ),
        database: configService.get<string>('MYSQL_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: true,
      // debug: process.env.NODE_ENV === 'development',
      // playground: process.env.NODE_ENV === 'development',
    }),
    GameModule,
    CategoryModule,
    MoodModule,
    PlayerModule,
    SessionModule,
    UniverseModule,
    UserModule,
    WishlistModule,
    MechanismModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
