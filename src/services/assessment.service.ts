import { AssessmentRepository } from "../repositories/assessment.repositorie";

const assessmentRepo = new AssessmentRepository();

export class AssessmentService {
  async createAssessment(data: any) {
    return assessmentRepo.create(data);
  }

  async getAllAssessments() {
    return assessmentRepo.findAll();
  }

  async getAssessmentById(id: string) {
    return assessmentRepo.findById(id);
  }

  async updateAssessment(id: string, data: any) {
    return assessmentRepo.update(id, data);
  }

  async deleteAssessment(id: string) {
    return assessmentRepo.delete(id);
  }
}
