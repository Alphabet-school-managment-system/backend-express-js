import { BaseRepository } from "./base.repositorie.ts";

export class staffRepo extends BaseRepository<"staff"> {
  constructor() {
    super("staff");
  }
}
