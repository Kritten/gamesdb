import {Universe} from "./universe.entity";
import {EntityService} from "../../utilities/EntityService";

export class UniverseService extends EntityService<Universe> {
  constructor() {
    super(Universe);
  }
}
