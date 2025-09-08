import { BaseRepository } from "./base.repositorie";

export class financeSummaryRepo extends BaseRepository<"financesummary"> {
  constructor() {
    super("financesummary");
  }
}
