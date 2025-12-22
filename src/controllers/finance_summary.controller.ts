import { FinanceSummaryService } from "../services/finance_summary.service.js";

import { BaseController } from "./base.controller.js";

export class FinanceSummaryController extends BaseController<FinanceSummaryService> {
  constructor() {
    super(new FinanceSummaryService());
  }
}
