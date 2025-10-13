import { studentMarkSummaryRepo } from "../repositories/student_mark_summary.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class StudentMarkSummaryService extends BaseService<studentMarkSummaryRepo> {
  constructor() {
    super(new studentMarkSummaryRepo());
  }
}
