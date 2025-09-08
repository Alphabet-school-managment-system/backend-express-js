import { FeeService } from "../services/fee.service";
import { feeSchema, FeeInput } from "../validators/zod.schema";
import { BaseController } from "./base.controller";

export class FeeController extends BaseController<FeeService, FeeInput> {
  constructor() {
    super(new FeeService(), feeSchema);
  }
}
