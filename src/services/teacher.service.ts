import { Request } from "express";
import { teacherRepo } from "../repositories/teacher.repositorie.js";
import { BaseService } from "./base.service.js";

export class TeacherService extends BaseService<teacherRepo> {
  constructor() {
    super(new teacherRepo());
  }

  async getMyAssignedGrade(req:Request) {
    return this.repository.getMyAssignedGrade(req);
  }
}
