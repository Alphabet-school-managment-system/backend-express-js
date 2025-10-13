import { BehaviorRepository } from "../repositories/behavior.repositorie.ts";

import { BaseService } from "./base.service.ts";

export class BehaviorService extends BaseService<BehaviorRepository> {
  constructor() {
    super(new BehaviorRepository());
  }
}
