import { BaseRepository } from "./base.repositorie.js";

export class feeRepo extends BaseRepository<"fee"> {
  constructor() {
    super("fee");
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
        },
        signal,
      });
    } catch (error) {
      this.handleError(error);
    }
  }
}
