import { BaseRepository } from "./base.repositorie.ts";

export class academicYearRepo extends BaseRepository<"academicyear"> {
  constructor() {
    super("academicyear");
  }

  async findById(branchId: string, signal?: AbortSignal) {
    try {
      return await this.model.findFirst({
        where: { branch_id: branchId },
        signal,
      });
    } catch (error) {
      this.handleError(error);
    }
  }
}
