import { EnrollmentService } from "../services/enrollment.service.ts";
import { enrollmentSchema } from "../validators/zod.schema.ts";

import { BaseController } from "./base.controller.ts";

export class EnrollmentController extends BaseController<EnrollmentService> {
  constructor() {
    super(new EnrollmentService(), enrollmentSchema);
  }
}
