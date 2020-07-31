import {Mechanism} from "./mechanism.entity";
import {EntityService} from "../../utilities/EntityService";

export class MechanismService extends EntityService<Mechanism> {
  constructor() {
    super();
    this.entityClass = Mechanism;
  }
}
