import { BaseRepository } from "./base.repositorie.ts";

export class libraryTransactionRepo extends BaseRepository<"librarytransaction"> {
  constructor() {
    super("librarytransaction");
  }
}
