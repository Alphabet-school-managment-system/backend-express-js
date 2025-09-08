import { BaseRepository } from "./base.repositorie";

export class libraryBookRepo extends BaseRepository<"librarytransaction"> {
  constructor() {
    super("librarytransaction");
  }
}
