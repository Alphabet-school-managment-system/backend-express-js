import { parentRepo } from "../repositories/parent.repositorie";
import { BaseService } from "./base.service";

export class ParentService extends BaseService<parentRepo> {
  constructor() {
    super(new parentRepo());
  }
}
