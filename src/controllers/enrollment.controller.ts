import { EnrollmentService } from "../services/enrollment.service";
import { enrollmentSchema } from "../validators/enrollment.schema";

import { BaseController } from "./base.controller";

export class EnrollmentController extends BaseController<EnrollmentService> {
  constructor() {
    super(new EnrollmentService(), enrollmentSchema);
  }
}
