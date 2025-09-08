import { teacherRepo } from "../repositories/teacher.repositorie";
import { BaseService } from "./base.service";

export class TeacherService extends BaseService<teacherRepo> {
  constructor() {
    super(new teacherRepo());
  }
}
