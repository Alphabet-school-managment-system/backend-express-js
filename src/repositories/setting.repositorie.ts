import { BaseRepository } from "./base.repositorie.js";

export class settingRepo extends BaseRepository<"setting"> {
  constructor() {
    super("setting");
  }

  async findById(schoolId: string, signal?: AbortSignal) {
    try {
      return await this.model.findFirst({
        where: { school_id: schoolId },
        signal,
      });
    } catch (error) {
      this.handleError(error);
    }
  }
}
