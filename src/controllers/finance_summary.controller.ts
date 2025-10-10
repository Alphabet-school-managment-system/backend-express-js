import { FinanceSummaryService } from "../services/finance_summary.service";

import { BaseController } from "./base.controller";

export class FinanceSummaryController extends BaseController<FinanceSummaryService> {
  constructor() {
    super(new FinanceSummaryService());
  }
}
