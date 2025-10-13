import { studentRepo } from "../repositories/student.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class StudentService extends BaseService<studentRepo> {
  constructor() {
    super(new studentRepo());
  }
}
