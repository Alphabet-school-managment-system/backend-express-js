import { Request, Response } from "express";
import { BaseRepository } from "./base.repositorie.js";

export class teacherRepo extends BaseRepository<"teacher"> {
  constructor() {
    super("teacher");
  }

  async create(data: any, res: Response, signal?: AbortSignal) {
    return this.create_people(data, res, signal);
  }

  async delete(id: string, signal?: AbortSignal) {
    return this.delete_people(id, signal);
  }

  async search(req: Request) {
    return this.search_people(req);
  }

  async findAll(options: {
    where?: any;
    orderBy?: any;
    take?: number;
    signal?: AbortSignal;
  }) {
    return this.findAll_people(options);
  }

  async getMyAssignedGrade(req: Request) {
    try {
      const { teacher_id, academic_year_id } = req.params;

      if (!teacher_id || !academic_year_id) {
        this.handleError("Teacher or academic year id not found.");
      }

      const grades = await this.prisma.timetable.findMany({
        where: {
          teacher_id: teacher_id,
          academic_year_id: academic_year_id,
        },
        select: {
          grade: true,
          section: true,
        },
        distinct: ["grade", "section"],
        orderBy: [{ grade: "asc" }, { section: "asc" }],
      });

      return grades;
    } catch (error) {
      this.handleError(error);
    }
  }
}
