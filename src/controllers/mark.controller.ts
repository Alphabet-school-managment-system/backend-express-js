import { MarkService } from "../services/mark.service";
import { markSchema, MarkInput } from "../validators/zod.schema";
import { BaseController } from "./base.controller";

export class MarkController extends BaseController<MarkService, MarkInput> {
  constructor() {
    super(new MarkService(), markSchema);
  }
}
