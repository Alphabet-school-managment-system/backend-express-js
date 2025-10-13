import { parentRepo } from "../repositories/parent.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class ParentService extends BaseService<parentRepo> {
  constructor() {
    super(new parentRepo());
  }
}
