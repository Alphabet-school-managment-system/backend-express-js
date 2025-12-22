import { StudentMarkSummaryController } from "../controllers/student_mark_summary.controller.js";
import { studentMarkSummarySchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new StudentMarkSummaryController(), studentMarkSummarySchema).router;

export default router;
