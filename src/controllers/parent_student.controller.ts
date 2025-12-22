import { ParentStudentService } from "../services/parent_student.service.js";
import {
  parentStudentSchema,
  ParentStudentInput,
} from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class ParentStudentController extends BaseController<
  ParentStudentService,
  ParentStudentInput
> {
  constructor() {
    super(new ParentStudentService(), parentStudentSchema);
  }
}
