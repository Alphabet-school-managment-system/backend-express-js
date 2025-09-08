import { StudentService } from "../services/student.service";
import { studentSchema, StudentInput } from "../validators/zod.schema";
import { BaseController } from "./base.controller";

export class StudentController extends BaseController<
  StudentService,
  StudentInput
> {
  constructor() {
    super(new StudentService(), studentSchema);
  }
}
