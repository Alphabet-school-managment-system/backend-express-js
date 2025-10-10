import { FinanceSummaryController } from "../controllers/finance_summary.controller";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new FinanceSummaryController()).router;

export default router;
