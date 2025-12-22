import { AssessmentService } from "../services/assessment.service.js";
import { assessmentSchema } from "../validators/zod.schema.js";

import { BaseController } from "./base.controller.js";

export class AssessmentController extends BaseController<AssessmentService> {
  constructor() {
    super(new AssessmentService(), assessmentSchema);
  }
}
