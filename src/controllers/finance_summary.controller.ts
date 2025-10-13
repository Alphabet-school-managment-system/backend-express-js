import { FinanceSummaryService } from "../services/finance_summary.service.ts";

import { BaseController } from "./base.controller.ts";

export class FinanceSummaryController extends BaseController<FinanceSummaryService> {
  constructor() {
    super(new FinanceSummaryService());
  }
}
