import { academicYearRepo } from "../repositories/academic_year.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class AcademicYearService extends BaseService<academicYearRepo> {
  constructor() {
    super(new academicYearRepo());
  }
}
