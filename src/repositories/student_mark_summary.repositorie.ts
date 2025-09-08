import { BaseRepository } from "./base.repositorie";

export class studentMarkSummaryRepo extends BaseRepository<"studentmarksummary"> {
  constructor() {
    super("studentmarksummary");
  }
}
