import { BaseRepository } from "./base.repositorie";

export class libraryTransactionRepo extends BaseRepository<"librarybook"> {
  constructor() {
    super("librarybook");
  }
}
