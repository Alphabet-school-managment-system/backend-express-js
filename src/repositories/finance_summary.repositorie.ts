import { BaseRepository } from "./base.repositorie.js";

export class financeSummaryRepo extends BaseRepository<"financesummary"> {
  constructor() {
    super("financesummary");
  }
}
