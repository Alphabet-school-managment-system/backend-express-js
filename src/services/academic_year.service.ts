import { academicYearRepo } from "../repositories/academic_year.repositorie.js";
import { BaseService } from "./base.service.js";

export class AcademicYearService extends BaseService<academicYearRepo> {
  constructor() {
    super(new academicYearRepo());
  }
}
