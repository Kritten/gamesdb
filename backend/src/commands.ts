import { Console, Command, createSpinner } from 'nestjs-console';
import * as fs from 'fs';
import { MechanismEntityService } from './modules/mechanism/mechanism.entity.service';
import { Mechanism } from './modules/mechanism/mechanism.entity';
import { Mood } from './modules/mood/mood.entity';
import { MoodEntityService } from './modules/mood/mood.entity.service';
import { CategoryEntityService } from './modules/category/category.entity.service';
import { Category } from './modules/category/category.entity';
import { Image } from './modules/image/image.entity';
import { ImageEntityService } from './modules/image/image.entity.service';
import { Game } from './modules/game/game.entity';
import { GameEntityService } from './modules/game/game.entity.service';
import { getManager, In } from 'typeorm/index';
import { UserEntityService } from './modules/user/user.entity.service';
import { User } from './modules/user/user.entity';

@Console()
export class MyCommands {
  constructor(private userService: UserEntityService) {}

  @Command({
    command: 'createuser <name> <password>',
    description: 'Creates a user',
  })
  async createUser(name: string, password: string): Promise<void> {
    await this.userService.create(
      getManager().create(User, {
        name: name.toLowerCase(),
        password,
      }),
    );
  }

  @Command({
    command: 'import <path>',
    description: 'Import database from wedding page',
  })
  async listContent(path: string): Promise<void> {
    const mechanismService = new MechanismEntityService();
    const moodService = new MoodEntityService();
    const categoryService = new CategoryEntityService();
    const imageService = new ImageEntityService();
    const gameService = new GameEntityService();
    const spin = createSpinner();
    spin.start(`Import database`);

    console.warn(path, 'path');
    const data = JSON.parse(fs.readFileSync(path).toString());

    const result = data.reduce((obj, entry) => {
      if (entry.type === 'table') {
        obj[entry.name] = entry.data;
      }

      return obj;
    }, {});

    console.warn(Object.keys(result), 'result');

    let items: any[];
    /**
     * Mechanisms
     */
    items = [];
    for (const item of result.api_type) {
      const newItem = new Mechanism();
      newItem.id = item.id;
      newItem.name = item.label;
      items.push(newItem);
    }
    await mechanismService.create(items);
    /**
     * Moods
     */
    items = [];
    for (const item of result.api_mood) {
      const newItem = new Mood();
      newItem.id = item.id;
      newItem.name = item.label;
      items.push(newItem);
    }
    await moodService.create(items);
    /**
     * Category
     */
    items = [];
    for (const item of result.api_genre) {
      const newItem = new Category();
      newItem.id = item.id;
      newItem.name = item.label;
      items.push(newItem);
    }
    await categoryService.create(items);
    /**
     * Image
     */
    items = [];
    for (const item of result.api_image) {
      const newItem = new Image();
      newItem.id = item.id;
      newItem.name = item.label;
      newItem.link = item.link;
      items.push(newItem);
    }
    await imageService.create(items);
    /**
     * Games
     */
    items = [];
    for (const item of result.api_game) {
      const newItem = new Game();
      newItem.id = item.id;
      newItem.name = item.title;
      newItem.description = item.description;
      newItem.countPlayersMin = parseInt(item.count_players_min);
      newItem.countPlayersMax = parseInt(item.count_players_max);
      newItem.minutesPlaytimeMin = parseInt(item.minutes_playtime_min);
      newItem.minutesPlaytimeMax = parseInt(item.minutes_playtime_max);
      newItem.isCoop = item.is_coop !== '0';
      newItem.complexity = parseInt(item.minutes_explanation);
      newItem.universes = [];
      newItem.playableWith = [];
      newItem.expansions = [];
      newItem.ratings = [];
      newItem.sessions = [];

      let arr = result.api_game_genres.reduce((arr, entry) => {
        if (entry.game_id === item.id) {
          arr.push(entry.genre_id);
        }
        return arr;
      }, []);

      if (arr.length > 0) {
        newItem.categories = await categoryService.find({
          where: {
            id: In(arr),
          },
        });
      } else {
        newItem.categories = [];
      }

      arr = result.api_game_moods.reduce((arr, entry) => {
        if (entry.game_id === item.id) {
          arr.push(entry.mood_id);
        }
        return arr;
      }, []);

      if (arr.length > 0) {
        newItem.moods = await moodService.find({
          where: {
            id: In(arr),
          },
        });
      } else {
        newItem.moods = [];
      }

      arr = result.api_game_types.reduce((arr, entry) => {
        if (entry.game_id === item.id) {
          arr.push(entry.type_id);
        }
        return arr;
      }, []);

      if (arr.length > 0) {
        newItem.mechanisms = await mechanismService.find({
          where: {
            id: In(arr),
          },
        });
      } else {
        newItem.mechanisms = [];
      }

      arr = result.api_game_images.reduce((arr, entry) => {
        if (entry.game_id === item.id) {
          arr.push(entry.image_id);
        }
        return arr;
      }, []);
      console.warn(arr, 'arr');

      if (arr.length > 0) {
        newItem.images = await imageService.find({
          where: {
            id: In(arr),
          },
        });
      } else {
        newItem.images = [];
      }
      items.push(newItem);
    }
    // console.warn(
    //   items.map((item: Game) => item.moods),
    //   'items',
    // );
    await gameService.create(items);

    // await mechanismService.find();
    // console.log(await mechanismService.find());

    // simulate a long task of 1 seconds
    // const files = await new Promise(done =>
    //   setTimeout(() => done(['fileA', 'fileB']), 1000),
    // );

    spin.succeed('Import done');

    // console.log(JSON.stringify(files));
  }
}
