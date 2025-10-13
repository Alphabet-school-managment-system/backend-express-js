import { BaseRepository } from "./base.repositorie.ts";

export class BranchRepository extends BaseRepository<"branch"> {
  constructor() {
    super("branch");
  }

  async findById(schoolId: string, signal?: AbortSignal) {
    try {
      return await this.model.findMany({
        where: { school_id: schoolId },
        signal,
      });
    } catch (error) {
      this.handleError(error);
    }
  }
}
