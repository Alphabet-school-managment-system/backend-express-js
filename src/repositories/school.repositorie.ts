import { BaseRepository } from "./base.repositorie.ts";

export class schoolRepo extends BaseRepository<"school"> {
  constructor() {
    super("school");
  }
}
