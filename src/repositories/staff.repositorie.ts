import { BaseRepository } from "./base.repositorie";

export class staffRepo extends BaseRepository<"staff"> {
  constructor() {
    super("staff");
  }
}
