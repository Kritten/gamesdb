import { CollectionService } from '../../../utilities/collection/collection.service';
import { Injectable } from '@nestjs/common';
import { Session } from '../session.entity';
import { SessionEntityService } from '../session.entity.service';

@Injectable()
export class SessionCollectionService extends CollectionService<Session> {
  constructor(private sessionEntityService: SessionEntityService) {
    super(Session, sessionEntityService);
  }
}
