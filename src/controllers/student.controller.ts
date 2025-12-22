import { StudentService } from "../services/student.service.js";
import { studentSchema, StudentInput } from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class StudentController extends BaseController<
  StudentService,
  StudentInput
> {
  constructor() {
    super(new StudentService(), studentSchema);
  }
}
