import { studentRepo } from "../repositories/student.repositorie";
import { BaseService } from "./base.service";

export class StudentService extends BaseService<studentRepo> {
  constructor() {
    super(new studentRepo());
  }
}
