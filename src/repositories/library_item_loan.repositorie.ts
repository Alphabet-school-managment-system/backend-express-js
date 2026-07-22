import { Request } from "express";
import { BaseRepository } from "./base.repositorie.js";

export class libraryItemLoanRepo extends BaseRepository<"libraryitemloan"> {
  constructor() {
    super("libraryitemloan");
  }

  includeFields = {
    libraryitem: {
      select: {
        id: true,
        title: true,
        registration_number: true,
      },
    },
    enrollment: {
      select: {
        id: true,
        student: {
          select: {
            first_name: true,
            middle_name: true,
            last_name: true,
            sex: true,
            student_registration_number: true,
          },
        },
      },
    },
    teacher: {
      select: {
        first_name: true,
        middle_name: true,
        sex: true,
        teacher_registration_number: true,
      },
    },
  };

  async findAll({
    where = {},
    orderBy,
    take,
    signal,
  }: {
    where?: any;
    orderBy?: any;
    take?: number;
    signal?: AbortSignal;
  }) {
    try {
      return await this.model.findMany(
        {
          where: {
            libraryitem: {
              ...where,
            },
          },
          include: this.includeFields,
          orderBy,
          take,
        },
        { signal },
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async findById(id: string, signal?: AbortSignal) {
    try {
      return await this.model.findFirst({
        where: { id },
        include: this.includeFields,
        signal,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async search(req: Request) {
    try {
      const queryOptions: any = this.preProcessSearchQuery(req.query);
      const signal = (req as any).prismaSignal;

      return await this.model.findMany(
        {
          ...queryOptions,
          include: this.includeFields,
        },
        { signal },
      );
    } catch (error) {
      this.handleError(error);
    }
  }
}
