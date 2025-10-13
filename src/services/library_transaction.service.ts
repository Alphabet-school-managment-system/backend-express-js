import { libraryTransactionRepo } from "../repositories/library_transaction.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class LibraryTransactionService extends BaseService<libraryTransactionRepo> {
  constructor() {
    super(new libraryTransactionRepo());
  }
}
