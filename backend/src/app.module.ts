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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 32770,
      username: 'root',
      password: 'test',
      database: 'database',
      autoLoadEntities: true,
      synchronize: true,
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
