import { BaseRepository } from "./base.repositorie.ts";

export class libraryBookRepo extends BaseRepository<"librarytransaction"> {
  constructor() {
    super("librarytransaction");
  }
}
