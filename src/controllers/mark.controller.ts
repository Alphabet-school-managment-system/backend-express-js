import { MarkService } from "../services/mark.service.js";
import { markSchema, MarkInput } from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class MarkController extends BaseController<MarkService, MarkInput> {
  constructor() {
    super(new MarkService(), markSchema);
  }
}
