import { assessmentSchema } from "../validators/zod.schema.ts";
import { AssessmentController } from "../controllers/assessment.controller.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new AssessmentController(), assessmentSchema)
  .router;

export default router;
