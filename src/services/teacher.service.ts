import { teacherRepo } from "../repositories/teacher.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class TeacherService extends BaseService<teacherRepo> {
  constructor() {
    super(new teacherRepo());
  }
}
