import { ParentService } from "../services/parent.service";
import {
  parentSchema,
  ParentInput,
} from "../validators/zod.schema";
import { BaseController } from "./base.controller";

export class ParentController extends BaseController<
  ParentService,
  ParentInput
> {
  constructor() {
    super(new ParentService(), parentSchema);
  }
}
