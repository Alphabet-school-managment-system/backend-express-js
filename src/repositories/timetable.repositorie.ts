import { Response } from "express";
import { BaseRepository } from "./base.repositorie.js";
export class timetableRepo extends BaseRepository<"timetable"> {
  constructor() {
    super("timetable");
  }

  async create(data: any, res: Response, signal?: AbortSignal) {
    try {
      const { academic_year_id, grade, section, period, day, teacher_id } =
        data;

      // check if schedule already exists for the same academic year, grade, section, period and day
      const existingSchedule = await this.model.findFirst(
        {
          where: {
            academic_year_id,
            grade,
            section,
            period,
            day,
          },
        },
        { signal },
      );

      if (existingSchedule) {
        res.status(409).json({
          message:
            "A schedule for this combination (grade, section, period & day) is already exists.",
        });
      }

      // check if the teacher already has a schedule at that date and period
      const teacherConflict = await this.model.findFirst(
        {
          where: {
            OR: [{ teacher_id, period, day }],
          },
        },
        { signal },
      );

      if (teacherConflict) {
        res.status(409).json({
          message: "The teacher already has a schedule at this day and period",
        });
      }

      const result = await this.model.create({ data, signal });
      res.status(201).json(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, data: any, signal?: AbortSignal) {
    try {
      const { academic_year_id, grade, section, period, day, teacher_id } =
        data;

      // check if another schedule (excluding the current one) already exists for the same academic year, grade, section, period and day
      const existingSchedule = await this.model.findFirst(
        {
          where: {
            academic_year_id,
            grade,
            section,
            period,
            day,
            NOT: { id },
          },
        },
        { signal },
      );

      if (existingSchedule) {
        throw new Error(
          "A schedule for this combination (grade, section, period & day) already exists.",
        );
      }

      // check if the teacher already has a schedule at that day and period (excluding the current record)
      const teacherConflict = await this.model.findFirst(
        {
          where: {
            teacher_id,
            period,
            day,
            NOT: { id },
          },
        },
        { signal },
      );

      if (teacherConflict) {
        throw new Error(
          "The teacher already has a schedule at this day and period.",
        );
      }

      const result = await this.model.update(
        { where: { id }, data },
        { signal },
      );

      return result;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(options: {
    where?: any;
    orderBy?: any;
    take?: number;
    signal?: AbortSignal;
  }) {
    const { where = {}, take, signal } = options;

    try {
      const normalizedWhere = this.normalizeWhereClause(where);
      const results = await this.model.findMany(
        {
          where: normalizedWhere,
          orderBy: { updated_at: "desc" },
          take,
          include: {
            teacher: {
              select: {
                id: true,
                first_name: true,
                middle_name: true,
                image: true,
                teacher_registration_number: true,
              },
            },
          },
        },
        { signal },
      );

      return results;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findById(id: string, signal?: AbortSignal) {
    try {
      const result = await this.model.findFirst({
        where: { id },
        include: {
          teacher: {
            select: {
              id: true,
              first_name: true,
              middle_name: true,
            },
          },
        },
        signal,
      });

      result.teacher = [result?.teacher];
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }
}
