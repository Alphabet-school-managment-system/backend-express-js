import { TeacherService } from "../services/teacher.service";
import { teacherSchema, TeacherInput } from "../validators/zod.schema";
import { BaseController } from "./base.controller";

export class TeacherController extends BaseController<
  TeacherService,
  TeacherInput
> {
  constructor() {
    super(new TeacherService(), teacherSchema);
  }
}
