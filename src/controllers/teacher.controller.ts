import { TeacherService } from "../services/teacher.service.js";
import { teacherSchema, TeacherInput } from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class TeacherController extends BaseController<
  TeacherService,
  TeacherInput
> {
  constructor() {
    super(new TeacherService(), teacherSchema);
  }
}
