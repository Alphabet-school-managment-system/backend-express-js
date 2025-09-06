import { AcademicYearService } from "../services/academic_year.service";
import { academicYearSchema } from "../validators/academic_year.schema";
import { BaseController } from "./base.controller";

export class AcademicYearController extends BaseController<AcademicYearService> {
  constructor() {
    super(new AcademicYearService(), academicYearSchema);
  }
}
