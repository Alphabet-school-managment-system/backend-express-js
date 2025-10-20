import { financeSummaryRepo } from "../repositories/finance_summary.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class FinanceSummaryService extends BaseService<financeSummaryRepo> {
  constructor() {
    super(new financeSummaryRepo());
  }
}
