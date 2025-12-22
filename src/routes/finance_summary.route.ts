import { FinanceSummaryController } from "../controllers/finance_summary.controller.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new FinanceSummaryController()).router;

export default router;
