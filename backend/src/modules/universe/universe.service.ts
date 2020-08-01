import {Universe} from "./universe.entity";
import {EntityService} from "../../utilities/entity.service";

export class UniverseService extends EntityService<Universe> {
  constructor() {
    super(Universe);
  }
}
