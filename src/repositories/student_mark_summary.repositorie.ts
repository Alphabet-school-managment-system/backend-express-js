import { BaseRepository } from "./base.repositorie.ts";

export class studentMarkSummaryRepo extends BaseRepository<"studentmarksummary"> {
  constructor() {
    super("studentmarksummary");
  }
}
