import { parentStudentRepo } from "../repositories/parent_student.repositorie.js";
import { BaseService } from "./base.service.js";

export class ParentStudentService extends BaseService<parentStudentRepo> {
  constructor() {
    super(new parentStudentRepo());
  }
}
