import { financeSummaryRepo } from "../repositories/finance_summary.repositorie";
import { BaseService } from "./base.service";

export class FinanceSummaryService extends BaseService<financeSummaryRepo> {
  constructor() {
    super(new financeSummaryRepo());
  }
}
