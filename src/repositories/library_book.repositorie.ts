import { BaseRepository } from "./base.repositorie.ts";

export class libraryBookRepo extends BaseRepository<"librarybook"> {
  constructor() {
    super("librarybook");
  }
}