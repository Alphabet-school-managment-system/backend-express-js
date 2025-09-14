import { AssessmentService } from "../services/assessment.service";
import { assessmentSchema } from "../validators/zod.schema";

import { BaseController } from "./base.controller";

export class AssessmentController extends BaseController<AssessmentService> {
  constructor() {
    super(new AssessmentService(), assessmentSchema);
  }
}
