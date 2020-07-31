import {Mood} from "./mood.entity";
import {EntityService} from "../../utilities/EntityService";

export class MoodService extends EntityService<Mood> {
  constructor() {
    super();
    this.entityClass = Mood;
  }
}
