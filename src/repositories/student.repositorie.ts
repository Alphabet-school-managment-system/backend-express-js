import { Response, Request } from "express";
import { BaseRepository } from "./base.repositorie.js";

export class studentRepo extends BaseRepository<"student"> {
  constructor() {
    super("student");
  }

  async create(data: any, res: Response, signal?: AbortSignal) {
    return this.create_people(data, res, signal);
  }

  async delete(id: string, signal?: AbortSignal) {
    return this.delete_people(id, signal);
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
