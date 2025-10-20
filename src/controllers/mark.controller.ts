import { MarkService } from "../services/mark.service.ts";
import { markSchema, MarkInput } from "../validators/zod.schema.ts";
import { BaseController } from "./base.controller.ts";

export class MarkController extends BaseController<MarkService, MarkInput> {
  constructor() {
    super(new MarkService(), markSchema);
  }
}
