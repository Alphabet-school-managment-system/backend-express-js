import { EnrollmentRepository } from "../repositories/enrollment.repositorie.js";

import { BaseService } from "./base.service.js";

export class EnrollmentService extends BaseService<EnrollmentRepository> {
  constructor() {
    super(new EnrollmentRepository());
  }
}
