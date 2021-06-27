import { EntityInterface } from '@/modules/app/utilities/entity/entity.types';
import { Rating } from '@/modules/rating/rating.model';
import { Mechanism } from '@/modules/mechanism/mechanism.model';
import { Mood } from '@/modules/mood/mood.model';
import { Image } from '@/modules/image/image.model';
import { Game } from '@/modules/game/game.model';
import { Universe } from '@/modules/universe/universe.model';
import { Category } from '@/modules/category/category.model';

export interface GameInterface extends EntityInterface {
  name?: string;
  description?: string;
  idBGG?: number | null;
  countPlayersMin?: number | null;
  countPlayersMax?: number | null;
  minutesPlaytimeMin?: number | null;
  minutesPlaytimeMax?: number | null;
  isCoop?: boolean;
  isDigital?: boolean;
  complexity?: number | null;
  ratingBGG?: number | null;
  size?: number | null;
  ratingAverage?: number | null;
  universes?: Universe[];
  categories?: Category[];
  mechanisms?: Mechanism[];
  moods?: Mood[];
  images?: Image[];
  playableWith?: Game[];
  isExpansionOf?: Game | null;
  expansions?: Game[];
  ratings?: Rating[];
}
