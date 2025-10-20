import { StudentMarkSummaryController } from "../controllers/student_mark_summary.controller.ts";
import { studentMarkSummarySchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new StudentMarkSummaryController(), studentMarkSummarySchema).router;

export default router;
