import { ParentStudentService } from "../services/parent_student.service.ts";
import {
  parentStudentSchema,
  ParentStudentInput,
} from "../validators/zod.schema.ts";
import { BaseController } from "./base.controller.ts";

export class ParentStudentController extends BaseController<
  ParentStudentService,
  ParentStudentInput
> {
  constructor() {
    super(new ParentStudentService(), parentStudentSchema);
  }
}
