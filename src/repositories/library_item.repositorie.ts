import { BaseRepository } from "./base.repositorie.ts";

export class libraryItemRepo extends BaseRepository<"libraryitem"> {
  constructor() {
    super("libraryitem");
  }
}
