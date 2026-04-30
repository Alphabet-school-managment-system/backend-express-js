import { BaseRepository } from "./base.repositorie.js";
import { Request } from "express";

export class BehaviorRepository extends BaseRepository<"behavior"> {
  constructor() {
    super("behavior");
  }

  async search(req: Request) {
    try {
      const signal = (req as any).prismaSignal;
      const queryOptions = this.preProcessSearchQuery(req.query);

      return await this.model.findMany(
        {
          ...queryOptions,
          include: {
            enrollment: {
              select: {
                id: true,
                grade: true,
                section: true,
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
          },
        },
        { signal },
      );
    } catch (error) {
      this.handleError(error);
    }
  }
}
