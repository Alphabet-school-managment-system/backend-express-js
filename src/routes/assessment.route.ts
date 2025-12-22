import { assessmentSchema } from "../validators/zod.schema.js";
import { AssessmentController } from "../controllers/assessment.controller.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new AssessmentController(), assessmentSchema)
  .router;

export default router;
