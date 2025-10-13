import { AssessmentRepository } from "../repositories/assessment.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class AssessmentService extends BaseService<AssessmentRepository> {
  constructor() {
    super(new AssessmentRepository());
  }
}
