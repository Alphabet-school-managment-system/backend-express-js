import { assessmentSchema } from "../validators/assessment.schema";
import { AssessmentController } from "../controllers/assessment.controller";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new AssessmentController(), assessmentSchema)
  .router;

export default router;
