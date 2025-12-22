import { ParentService } from "../services/parent.service.js";
import {
  parentSchema,
  ParentInput,
} from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class ParentController extends BaseController<
  ParentService,
  ParentInput
> {
  constructor() {
    super(new ParentService(), parentSchema);
  }
}
