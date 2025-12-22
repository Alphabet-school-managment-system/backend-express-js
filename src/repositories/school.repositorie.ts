import { BaseRepository } from "./base.repositorie.js";

export class schoolRepo extends BaseRepository<"school"> {
  constructor() {
    super("school");
  }
}
