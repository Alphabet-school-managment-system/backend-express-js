import { EnrollmentRepository } from "../repositories/enrollment.repositorie.ts";

import { BaseService } from "./base.service.ts";

export class EnrollmentService extends BaseService<EnrollmentRepository> {
  constructor() {
    super(new EnrollmentRepository());
  }
}
