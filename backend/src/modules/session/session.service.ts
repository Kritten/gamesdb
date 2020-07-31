import {Session} from "./session.entity";
import {EntityService} from "../../utilities/EntityService";

export class SessionService extends EntityService<Session> {
  constructor() {
    super();
    this.entityClass = Session;
  }
}
