import { academicYearRepo } from "../repositories/academic_year.repositorie";
import { BaseService } from "./base.service";

export class AcademicYearService extends BaseService<academicYearRepo> {
  constructor() {
    super(new academicYearRepo());
  }
}
