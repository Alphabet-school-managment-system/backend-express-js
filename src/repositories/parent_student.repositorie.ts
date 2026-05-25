import { Request } from "express";
import { BaseRepository } from "./base.repositorie.js";

export class parentStudentRepo extends BaseRepository<"parentstudent"> {
  constructor() {
    super("parentstudent");
  }

  async search(req: Request) {
    try {
      const queryOptions: any = this.preProcessSearchQuery(req.query);

      // Only use signal if it exists
      const signal = (req as any).prismaSignal;

      return await this.model.findMany(
        {
          ...queryOptions,
          include: {
            enrollment: {
              select: {
                id: true,
                grade: true,
                section: true,
                stream: true,
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
          },
        },
        { signal },
      );
    } catch (error) {
      this.handleError(error);
    }
  }
}
