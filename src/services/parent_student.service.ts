import { parentStudentRepo } from "../repositories/parent_student.repositorie";
import { BaseService } from "./base.service";

export class ParentStudentService extends BaseService<parentStudentRepo> {
  constructor() {
    super(new parentStudentRepo());
  }
}
