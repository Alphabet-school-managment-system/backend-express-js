import { Request, Response } from "express";
import { BaseRepository } from "./base.repositorie.js";

export class EnrollmentRepository extends BaseRepository<"enrollment"> {
  constructor() {
    super("enrollment");
  }

  async create(data: any, res: Response, signal?: AbortSignal) {
    try {
      const isEnrollled = await this.model.findFirst({
        where: {
          student_id: data.student_id,
          academic_year_id: data.academic_year_id,
        },
        signal,
      });

      if (isEnrollled) {
        res.status(400).json({
          message: "Student is already enrolled for this academic year.",
        });
        return;
      }
      const result = await this.model.create({ data, signal });
      res.status(201).json(result);
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
      const results = await this.model.findMany(
        {
          where: {
            ...where,
          },
          orderBy: { updated_at: "desc" },
          take,
          include: {
            student: {
              select: {
                id: true,
                email: true,
                phone: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                image: true,
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
      return await this.model.findFirst({
        where: { id },
        include: {
          student: {
            select: {
              first_name: true,
              middle_name: true,
              last_name: true,
              email: true,
              phone: true,
              student_registration_number: true,
              sex: true,
              address: true,
            },
          },
        },
        signal,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async search(req: Request) {
    try {
      const signal = (req as any).prismaSignal;
      const queryOptions = this.preProcessSearchQuery(req.query);

      return await this.model.findMany(
        {
          ...queryOptions,
          select: {
            id: true,
            student: {
              select: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                image: true,
                student_registration_number: true,
              },
            },
          },
        },
        { signal },
      );
    } catch (error) {
      this.handleError(error);
    }
  }
}
