import { studentRepo } from "../repositories/student.repositorie.js";
import { BaseService } from "./base.service.js";

export class StudentService extends BaseService<studentRepo> {
  constructor() {
    super(new studentRepo());
  }
}
