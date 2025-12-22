import { AssessmentRepository } from "../repositories/assessment.repositorie.js";
import { BaseService } from "./base.service.js";

export class AssessmentService extends BaseService<AssessmentRepository> {
  constructor() {
    super(new AssessmentRepository());
  }
}
