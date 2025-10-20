import { StudentService } from "../services/student.service.ts";
import { studentSchema, StudentInput } from "../validators/zod.schema.ts";
import { BaseController } from "./base.controller.ts";

export class StudentController extends BaseController<
  StudentService,
  StudentInput
> {
  constructor() {
    super(new StudentService(), studentSchema);
  }
}
