import { TeacherService } from "../services/teacher.service.ts";
import { teacherSchema, TeacherInput } from "../validators/zod.schema.ts";
import { BaseController } from "./base.controller.ts";

export class TeacherController extends BaseController<
  TeacherService,
  TeacherInput
> {
  constructor() {
    super(new TeacherService(), teacherSchema);
  }
}
