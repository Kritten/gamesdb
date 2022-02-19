import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { GameInterface } from '@/modules/game/game.types';
import { Universe } from '@/modules/universe/universe.model';
import { Category } from '@/modules/category/category.model';
import { Mechanism } from '@/modules/mechanism/mechanism.model';
import { Mood } from '@/modules/mood/mood.model';
import { Rating } from '@/modules/rating/rating.model';
import {
    EntityInterface,
    ID,
} from '@/modules/app/utilities/entity/entity.types';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';
import { useUniverse } from '@/modules/universe/composables/useUniverse';
import { useCategory } from '@/modules/category/composables/useCategory';
import { useMechanism } from '@/modules/mechanism/composables/useMechanism';
import { useMood } from '@/modules/mood/composables/useMood';

export class Game extends Entity implements GameInterface {
    name: string;

    description: string;

    idBGG: number | null;

    countPlayersMin: number | null;

    countPlayersMax: number | null;

    minutesPlaytimeMin: number | null;

    minutesPlaytimeMax: number | null;

    isCoop: boolean;

    isDigital: boolean;

    complexity: number | null;

    ratingBGG: number | null;

    size: number | null;

    ratingAverage: number | null;

    ratingCount: number | null;

    universes: Universe[];

    categories: Category[];

    mechanisms: Mechanism[];

    moods: Mood[];

    images: Array<string>;

    // eslint-disable-next-line no-use-before-define
    playableWith: Game[];

    // eslint-disable-next-line no-use-before-define
    isExpansionOf: Game | null;

    // eslint-disable-next-line no-use-before-define
    expansions: Game[];

    ratings: Rating[];

    constructor(data: GameInterface = {}) {
        super(data);
        this.idBGG = setDefaultIfNullOrUndefined<number | null>(
            data.idBGG,
            null
        );
        this.name = setDefaultIfNullOrUndefined<string>(data.name, '');
        this.description = setDefaultIfNullOrUndefined<string>(
            data.description,
            ''
        );
        this.countPlayersMin = setDefaultIfNullOrUndefined<number | null>(
            data.countPlayersMin,
            null
        );
        this.countPlayersMax = setDefaultIfNullOrUndefined<number | null>(
            data.countPlayersMax,
            null
        );
        this.minutesPlaytimeMin = setDefaultIfNullOrUndefined<number | null>(
            data.minutesPlaytimeMin,
            null
        );
        this.minutesPlaytimeMax = setDefaultIfNullOrUndefined<number | null>(
            data.minutesPlaytimeMax,
            null
        );
        this.isCoop = setDefaultIfNullOrUndefined<boolean>(data.isCoop, false);
        this.isDigital = setDefaultIfNullOrUndefined<boolean>(
            data.isDigital,
            false
        );
        this.complexity = setDefaultIfNullOrUndefined<number | null>(
            data.complexity,
            null
        );
        this.ratingBGG = setDefaultIfNullOrUndefined<number | null>(
            data.ratingBGG,
            null
        );
        this.size = setDefaultIfNullOrUndefined<number | null>(data.size, null);
        this.ratingAverage = setDefaultIfNullOrUndefined<number | null>(
            data.ratingAverage,
            null
        );
        this.ratingCount = setDefaultIfNullOrUndefined<number | null>(
            data.ratingCount,
            null
        );
        this.universes = setDefaultIfNullOrUndefined<Universe[]>(
            data.universes,
            []
        );
        this.categories = setDefaultIfNullOrUndefined<Category[]>(
            data.categories,
            []
        );
        this.mechanisms = setDefaultIfNullOrUndefined<Mechanism[]>(
            data.mechanisms,
            []
        );
        this.moods = setDefaultIfNullOrUndefined<Mood[]>(data.moods, []);
        this.images = setDefaultIfNullOrUndefined<Array<string>>(
            data.images,
            []
        );
        this.playableWith = setDefaultIfNullOrUndefined<Game[]>(
            data.playableWith,
            []
        );
        this.isExpansionOf = setDefaultIfNullOrUndefined<Game | null>(
            data.isExpansionOf,
            null
        );
        this.expansions = setDefaultIfNullOrUndefined<Game[]>(
            data.expansions,
            []
        );
        this.ratings = setDefaultIfNullOrUndefined<Rating[]>(data.ratings, []);
    }

    static async parseFromServer(data: EntityInterface): Promise<Game> {
        const entity = (await super.parseFromServer(data)) as Game;

        if (entity.universes !== undefined) {
            const { universeById } = useUniverse();

            entity.universes = entity.universes.map((universe) =>
                universeById(universe.id as ID)
            );
        }

        if (entity.categories !== undefined) {
            const { categoryById } = useCategory();

            entity.categories = entity.categories.map((category) =>
                categoryById(category.id as ID)
            );
        }

        if (entity.mechanisms !== undefined) {
            const { mechanismById } = useMechanism();

            entity.mechanisms = entity.mechanisms.map((mechanism) =>
                mechanismById(mechanism.id as ID)
            );
        }

        if (entity.moods !== undefined) {
            const { moodById } = useMood();

            entity.moods = entity.moods.map((mood) => moodById(mood.id as ID));
        }

        entity.images = JSON.parse(
            entity.images as unknown as string
        ) as Array<string>;

        return entity;
    }

    prepareForServer() {
        const data = super.prepareForServer();

        data.idBGG = this.idBGG;
        data.name = this.name;
        data.description = this.description;
        data.countPlayersMin = this.countPlayersMin;
        data.countPlayersMax = this.countPlayersMax;
        data.minutesPlaytimeMin = this.minutesPlaytimeMin;
        data.minutesPlaytimeMax = this.minutesPlaytimeMax;
        data.isCoop = this.isCoop;
        data.isDigital = this.isDigital;
        data.complexity = this.complexity;
        data.ratingBGG = this.ratingBGG;
        data.size = this.size;
        data.universes = this.universes.map((universe) => universe.id);
        data.categories = this.categories.map((category) => category.id);
        data.mechanisms = this.mechanisms.map((mechanism) => mechanism.id);
        data.moods = this.moods.map((mood) => mood.id);
        data.images = JSON.stringify(this.images);
        data.playableWith = this.playableWith.map((game) => game.id);
        data.isExpansionOf = this.isExpansionOf;
        data.expansions = this.expansions.map((game) => game.id);
        // data.ratings = this.ratings.map(rating => rating.id);

        return data;
    }
}
