import { BaseRepository } from "./base.repositorie.js";

export class libraryItemLoanRepo extends BaseRepository<"libraryitemloan"> {
  constructor() {
    super("libraryitemloan");
  }

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
          include: {
            libraryitem: true,
            enrollment: true,
            teacher: true,
          },
          orderBy,
          take,
        },
        { signal }
      );
    } catch (error) {
      this.handleError(error);
    }
  }
}
