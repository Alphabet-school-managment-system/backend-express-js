import { FinanceSummaryService } from "../services/finance_summary.service";
import {
  financeSummarySchema,
  FinanceSummaryInput,
} from "../validators/zod.schema";
import { BaseController } from "./base.controller";

export class FinanceSummaryController extends BaseController<
  FinanceSummaryService,
  FinanceSummaryInput
> {
  constructor() {
    super(new FinanceSummaryService(), financeSummarySchema);
  }
}
