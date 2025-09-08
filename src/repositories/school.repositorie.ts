import { BaseRepository } from "./base.repositorie";

export class schoolRepo extends BaseRepository<"school"> {
  constructor() {
    super("school");
  }
}
