import { FinanceSummaryController } from "../controllers/finance_summary.controller";
import { financeSummarySchema } from "../validators/zod.schema";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new FinanceSummaryController(), financeSummarySchema).router;

export default router;
