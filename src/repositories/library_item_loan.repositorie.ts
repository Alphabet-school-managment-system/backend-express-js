import { BaseRepository } from "./base.repositorie.ts";

export class libraryItemLoanRepo extends BaseRepository<"libraryitemloan"> {
  constructor() {
    super("libraryitemloan");
  }
}
