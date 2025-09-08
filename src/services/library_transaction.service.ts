import { libraryTransactionRepo } from "../repositories/library_transaction.repositorie";
import { BaseService } from "./base.service";

export class LibraryTransactionService extends BaseService<libraryTransactionRepo> {
  constructor() {
    super(new libraryTransactionRepo());
  }
}
