import { parentRepo } from "../repositories/parent.repositorie.js";
import { BaseService } from "./base.service.js";

export class ParentService extends BaseService<parentRepo> {
  constructor() {
    super(new parentRepo());
  }
}
