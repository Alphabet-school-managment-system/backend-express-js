import { AssessmentService } from "../services/assessment.service";
import { assessmentSchema } from "../validators/assessment.schema";

import { BaseController } from "./base.controller";

export class AssessmentController extends BaseController<AssessmentService> {
  constructor() {
    super(new AssessmentService(), assessmentSchema);
  }
}
