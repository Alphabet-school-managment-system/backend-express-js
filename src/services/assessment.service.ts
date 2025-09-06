import { AssessmentRepository } from "../repositories/assessment.repositorie";
import { BaseService } from "./base.service";

export class AssessmentService extends BaseService<AssessmentRepository> {
  constructor() {
    super(new AssessmentRepository());
  }
}
