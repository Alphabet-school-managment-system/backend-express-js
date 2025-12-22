import { BehaviorService } from "../services/behavior.service.js";
import { behaviorSchema } from "../validators/zod.schema.js";

import { BaseController } from "./base.controller.js";

export class BehaviorController extends BaseController<BehaviorService> {
  constructor() {
    super(new BehaviorService(), behaviorSchema);
  }
}
