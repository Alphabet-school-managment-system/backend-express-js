import { BehaviorRepository } from "../repositories/behavior.repositorie.js";

import { BaseService } from "./base.service.js";

export class BehaviorService extends BaseService<BehaviorRepository> {
  constructor() {
    super(new BehaviorRepository());
  }
}
