import { parentStudentRepo } from "../repositories/parent_student.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class ParentStudentService extends BaseService<parentStudentRepo> {
  constructor() {
    super(new parentStudentRepo());
  }
}
