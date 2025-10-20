import { FeeService } from "../services/fee.service.ts";
import { feeSchema, FeeInput } from "../validators/zod.schema.ts";
import { BaseController } from "./base.controller.ts";

export class FeeController extends BaseController<FeeService, FeeInput> {
  constructor() {
    super(new FeeService(), feeSchema);
  }
}
