import { AcademicYearService } from "../services/academic_year.service.js";
import { academicYearSchema } from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class AcademicYearController extends BaseController<AcademicYearService> {
  constructor() {
    super(new AcademicYearService(), academicYearSchema);
  }
}
