import { BehaviorService } from "../services/behavior.service";
import { behaviorSchema } from "../validators/zod.schema";

import { BaseController } from "./base.controller";

export class BehaviorController extends BaseController<BehaviorService> {
  constructor() {
    super(new BehaviorService(), behaviorSchema);
  }
}
