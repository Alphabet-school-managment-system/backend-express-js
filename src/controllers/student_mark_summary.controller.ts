import { StudentMarkSummaryService } from "../services/student_mark_summary.service";
import {
  studentMarkSummarySchema,
  StudentMarkSummaryInput,
} from "../validators/zod.schema";
import { BaseController } from "./base.controller";

export class StudentMarkSummaryController extends BaseController<
  StudentMarkSummaryService,
  StudentMarkSummaryInput
> {
  constructor() {
    super(new StudentMarkSummaryService(), studentMarkSummarySchema);
  }
}
