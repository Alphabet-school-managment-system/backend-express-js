import { AttendanceRepository } from "../repositories/attendance.repositorie.js";
import { BaseService } from "./base.service.js";
import { Request } from "express";

export class AttendanceService extends BaseService<AttendanceRepository> {
  constructor() {
    super(new AttendanceRepository());
  }

  async findAll(req: Request) {
    const { date, grade, section, academic_year_id } = req.query;

    return this.repository.findAll({
      where: {
        date: date as string | undefined,
        grade: grade as string | undefined,
        section: section as string | undefined,
        academic_year_id: academic_year_id as string | undefined,
      },
    });
  }
}
