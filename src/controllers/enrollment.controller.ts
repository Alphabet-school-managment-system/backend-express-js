import { EnrollmentService } from "../services/enrollment.service.js";
import { enrollmentSchema } from "../validators/zod.schema.js";

import { BaseController } from "./base.controller.js";

export class EnrollmentController extends BaseController<EnrollmentService> {
  constructor() {
    super(new EnrollmentService(), enrollmentSchema);
  }
}
