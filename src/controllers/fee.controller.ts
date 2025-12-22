import { FeeService } from "../services/fee.service.js";
import { feeSchema, FeeInput } from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class FeeController extends BaseController<FeeService, FeeInput> {
  constructor() {
    super(new FeeService(), feeSchema);
  }
}
