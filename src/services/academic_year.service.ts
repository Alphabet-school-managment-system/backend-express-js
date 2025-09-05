import { AcademicYearRepository } from "../repositories/academic_year.repositorie";

const academicYearRepo = new AcademicYearRepository();

export class AcademicYearService {
  async createAcademicYear(data: any) {
    return academicYearRepo.create(data);
  }

  async getAllAcademicYears() {
    return academicYearRepo.findAll();
  }

  async getAcademicYearById(id: string) {
    return academicYearRepo.findById(id);
  }

  async updateAcademicYear(id: string, data: any) {
    return academicYearRepo.update(id, data);
  }

  async deleteAcademicYear(id: string) {
    return academicYearRepo.delete(id);
  }
}
