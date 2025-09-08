import { ParentStudentService } from "../services/parent_student.service";
import {
  parentStudentSchema,
  ParentStudentInput,
} from "../validators/zod.schema";
import { BaseController } from "./base.controller";

export class ParentStudentController extends BaseController<
  ParentStudentService,
  ParentStudentInput
> {
  constructor() {
    super(new ParentStudentService(), parentStudentSchema);
  }
}
