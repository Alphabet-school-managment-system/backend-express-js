import { BaseRepository } from "./base.repositorie.ts";

export class financeSummaryRepo extends BaseRepository<"financesummary"> {
  constructor() {
    super("financesummary");
  }
}
