import { StudentMarkSummaryService } from "../services/student_mark_summary.service.js";
import {
  studentMarkSummarySchema,
  StudentMarkSummaryInput,
} from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class StudentMarkSummaryController extends BaseController<
  StudentMarkSummaryService,
  StudentMarkSummaryInput
> {
  constructor() {
    super(new StudentMarkSummaryService(), studentMarkSummarySchema);
  }
}
