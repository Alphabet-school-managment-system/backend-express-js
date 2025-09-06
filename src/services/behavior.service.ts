import { BehaviorRepository } from "../repositories/behavior.repositorie";

import { BaseService } from "./base.service";

export class BehaviorService extends BaseService<BehaviorRepository> {
  constructor() {
    super(new BehaviorRepository());
  }
}
