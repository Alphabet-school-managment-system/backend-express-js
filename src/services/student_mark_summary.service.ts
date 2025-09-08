import { studentMarkSummaryRepo } from "../repositories/student_mark_summary.repositorie";
import { BaseService } from "./base.service";

export class StudentMarkSummaryService extends BaseService<studentMarkSummaryRepo> {
  constructor() {
    super(new studentMarkSummaryRepo());
  }
}
