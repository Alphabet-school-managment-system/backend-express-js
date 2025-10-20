import { FinanceSummaryController } from "../controllers/finance_summary.controller.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new FinanceSummaryController()).router;

export default router;
