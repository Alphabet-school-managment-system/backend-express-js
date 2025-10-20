import { AssessmentService } from "../services/assessment.service.ts";
import { assessmentSchema } from "../validators/zod.schema.ts";

import { BaseController } from "./base.controller.ts";

export class AssessmentController extends BaseController<AssessmentService> {
  constructor() {
    super(new AssessmentService(), assessmentSchema);
  }
}
