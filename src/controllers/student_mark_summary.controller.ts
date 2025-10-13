import { StudentMarkSummaryService } from "../services/student_mark_summary.service.ts";
import {
  studentMarkSummarySchema,
  StudentMarkSummaryInput,
} from "../validators/zod.schema.ts";
import { BaseController } from "./base.controller.ts";

export class StudentMarkSummaryController extends BaseController<
  StudentMarkSummaryService,
  StudentMarkSummaryInput
> {
  constructor() {
    super(new StudentMarkSummaryService(), studentMarkSummarySchema);
  }
}
