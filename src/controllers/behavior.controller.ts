import { BehaviorService } from "../services/behavior.service.ts";
import { behaviorSchema } from "../validators/zod.schema.ts";

import { BaseController } from "./base.controller.ts";

export class BehaviorController extends BaseController<BehaviorService> {
  constructor() {
    super(new BehaviorService(), behaviorSchema);
  }
}
