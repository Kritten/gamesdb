import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { GameInterface } from '@/modules/game/game.types';
import { Universe } from '@/modules/universe/universe.model';
import { Category } from '@/modules/category/category.model';
import { Mechanism } from '@/modules/mechanism/mechanism.model';
import { Mood } from '@/modules/mood/mood.model';
import { Image } from '@/modules/image/image.model';
import { Rating } from '@/modules/rating/rating.model';
import { EntityInterface, ID } from '@/modules/app/utilities/entity/entity.types';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';
import { store } from '@/modules/app/app.store';

export class Game extends Entity implements GameInterface {
  name: string;

  description: string;

  countPlayersMin: number;

  countPlayersMax: number;

  minutesPlaytimeMin: number;

  minutesPlaytimeMax: number;

  isCoop: boolean;

  isDigital: boolean;

  complexity: number;

  size: number;

  universes: Universe[];

  categories: Category[];

  mechanisms: Mechanism[];

  moods: Mood[];

  images: Image[];

  playableWith: Game[];

  isExpansionOf: Game | null;

  expansions: Game[];

  ratings: Rating[];

  constructor(data: GameInterface = {}) {
    super(data);
    this.name = setDefaultIfNullOrUndefined<string>(data.name, '');
    this.description = setDefaultIfNullOrUndefined<string>(data.description, '');
    this.countPlayersMin = setDefaultIfNullOrUndefined<number>(data.countPlayersMin, 0);
    this.countPlayersMax = setDefaultIfNullOrUndefined<number>(data.countPlayersMax, 0);
    this.minutesPlaytimeMin = setDefaultIfNullOrUndefined<number>(data.minutesPlaytimeMin, 0);
    this.minutesPlaytimeMax = setDefaultIfNullOrUndefined<number>(data.minutesPlaytimeMax, 0);
    this.isCoop = setDefaultIfNullOrUndefined<boolean>(data.isCoop, false);
    this.isDigital = setDefaultIfNullOrUndefined<boolean>(data.isDigital, false);
    this.complexity = setDefaultIfNullOrUndefined<number>(data.complexity, 0);
    this.size = setDefaultIfNullOrUndefined<number>(data.size, 0);
    this.universes = setDefaultIfNullOrUndefined<Universe[]>(data.universes, []);
    this.categories = setDefaultIfNullOrUndefined<Category[]>(data.categories, []);
    this.mechanisms = setDefaultIfNullOrUndefined<Mechanism[]>(data.mechanisms, []);
    this.moods = setDefaultIfNullOrUndefined<Mood[]>(data.moods, []);
    this.images = setDefaultIfNullOrUndefined<Image[]>(data.images, []);
    this.playableWith = setDefaultIfNullOrUndefined<Game[]>(data.playableWith, []);
    this.isExpansionOf = setDefaultIfNullOrUndefined<Game | null>(data.isExpansionOf, null);
    this.expansions = setDefaultIfNullOrUndefined<Game[]>(data.expansions, []);
    this.ratings = setDefaultIfNullOrUndefined<Rating[]>(data.ratings, []);
  }

  static async parseFromServer(data: EntityInterface): Promise<Game> {
    const entity = (await super.parseFromServer(data)) as Game;

    if (entity.universes !== undefined) {
      entity.universes = entity.universes.map(
        // @ts-ignore
        (universe) => store.state.moduleUniverse.universes[universe.id as ID],
      );
    }

    if (entity.categories !== undefined) {
      entity.categories = entity.categories.map(
        // @ts-ignore
        (category) => store.state.moduleCategory.categories[category.id as ID],
      );
    }

    if (entity.mechanisms !== undefined) {
      entity.mechanisms = entity.mechanisms.map(
        // @ts-ignore
        (mechanism) => store.state.moduleMechanism.mechanisms[mechanism.id as ID],
      );
    }

    if (entity.moods !== undefined) {
      // @ts-ignore
      entity.moods = entity.moods.map((mood) => store.state.moduleMood.moods[mood.id as ID]);
    }

    return entity;
  }

  prepareForServer() {
    const data = super.prepareForServer();

    data.name = this.name;
    data.description = this.description;
    data.countPlayersMin = this.countPlayersMin;
    data.countPlayersMax = this.countPlayersMax;
    data.minutesPlaytimeMin = this.minutesPlaytimeMin;
    data.minutesPlaytimeMax = this.minutesPlaytimeMax;
    data.isCoop = this.isCoop;
    data.isDigital = this.isDigital;
    data.complexity = this.complexity;
    data.size = this.size;
    data.universes = this.universes.map((universe) => universe.id);
    data.categories = this.categories.map((category) => category.id);
    data.mechanisms = this.mechanisms.map((mechanism) => mechanism.id);
    data.moods = this.moods.map((mood) => mood.id);
    data.images = this.images.map((image) => image.id);
    data.playableWith = this.playableWith.map((game) => game.id);
    data.isExpansionOf = this.isExpansionOf;
    data.expansions = this.expansions.map((game) => game.id);
    // data.ratings = this.ratings.map(rating => rating.id);

    return data;
  }
}
