import { ParentService } from "../services/parent.service.ts";
import {
  parentSchema,
  ParentInput,
} from "../validators/zod.schema.ts";
import { BaseController } from "./base.controller.ts";

export class ParentController extends BaseController<
  ParentService,
  ParentInput
> {
  constructor() {
    super(new ParentService(), parentSchema);
  }
}
