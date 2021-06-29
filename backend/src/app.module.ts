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
import { AuthModule } from './modules/auth/auth.module';
import { RatingModule } from './modules/rating/rating.module';
import { ConsoleModule } from 'nestjs-console';
import { MyCommands } from './commands';
import { PlaytimeModule } from './modules/playtime/playtime.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { CollectionModule } from './utilities/collection/collection.module';

@Module({
  imports: [
    ConsoleModule,
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
        timezone: 'Z',
        bigNumberStrings: false,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
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
    AuthModule,
    RatingModule,
    PlaytimeModule,
    StatisticsModule,
    CollectionModule,
  ],
  controllers: [AppController],
  providers: [AppService, MyCommands],
  exports: [MyCommands],
})
export class AppModule {}
