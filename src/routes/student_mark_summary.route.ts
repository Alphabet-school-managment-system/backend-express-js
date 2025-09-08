import { StudentMarkSummaryController } from "../controllers/student_mark_summary.controller";
import { studentMarkSummarySchema } from "../validators/zod.schema";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new StudentMarkSummaryController(), studentMarkSummarySchema).router;

export default router;
