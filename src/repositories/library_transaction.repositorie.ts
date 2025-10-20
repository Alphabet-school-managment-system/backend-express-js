import { BaseRepository } from "./base.repositorie.ts";

export class libraryTransactionRepo extends BaseRepository<"librarybook"> {
  constructor() {
    super("librarybook");
  }
}
