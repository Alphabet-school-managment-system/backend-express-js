import { studentMarkSummaryRepo } from "../repositories/student_mark_summary.repositorie.js";
import { BaseService } from "./base.service.js";

export class StudentMarkSummaryService extends BaseService<studentMarkSummaryRepo> {
  constructor() {
    super(new studentMarkSummaryRepo());
  }
}
