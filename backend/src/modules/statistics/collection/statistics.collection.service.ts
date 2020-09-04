import { CollectionService } from '../../../utilities/collection/collection.service';
import { Injectable } from '@nestjs/common';
import { Image } from '../../image/image.entity';

@Injectable()
export class StatisticsCollectionService extends CollectionService<Image> {}
