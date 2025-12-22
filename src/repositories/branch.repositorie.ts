import { BaseRepository } from "./base.repositorie.js";

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

  async changeCurrent(payload: { id: string }) {
    const { id } = payload;

    const target = await this.model.findUnique({
      where: { id },
    });

    const school_id = (target as any).school_id;

    // unset current flag for existing current branches in that school
    await this.model.updateMany({
      where: { school_id, isCurrent: true },
      data: { isCurrent: false },
    });

    // set the requested branch as current
    const updated = await this.model.update({
      where: { id },
      data: { isCurrent: true },
    });

    return updated;
  }
}
