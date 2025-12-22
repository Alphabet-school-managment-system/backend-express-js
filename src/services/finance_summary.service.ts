import { financeSummaryRepo } from "../repositories/finance_summary.repositorie.js";
import { BaseService } from "./base.service.js";

export class FinanceSummaryService extends BaseService<financeSummaryRepo> {
  constructor() {
    super(new financeSummaryRepo());
  }
}
