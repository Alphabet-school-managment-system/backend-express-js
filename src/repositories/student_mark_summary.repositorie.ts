import { BaseRepository } from "./base.repositorie.js";

export class studentMarkSummaryRepo extends BaseRepository<"studentmarksummary"> {
  constructor() {
    super("studentmarksummary");
  }
}
