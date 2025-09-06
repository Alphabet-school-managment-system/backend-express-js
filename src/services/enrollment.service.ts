import { EnrollmentRepository } from "../repositories/enrollment.repositorie";

import { BaseService } from "./base.service";

export class EnrollmentService extends BaseService<EnrollmentRepository> {
  constructor() {
    super(new EnrollmentRepository());
  }
}
