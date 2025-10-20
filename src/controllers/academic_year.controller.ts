import { AcademicYearService } from "../services/academic_year.service.ts";
import { academicYearSchema } from "../validators/zod.schema.ts";
import { BaseController } from "./base.controller.ts";

export class AcademicYearController extends BaseController<AcademicYearService> {
  constructor() {
    super(new AcademicYearService(), academicYearSchema);
  }
}
