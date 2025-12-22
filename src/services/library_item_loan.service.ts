import { libraryItemLoanRepo } from "../repositories/library_item_loan.repositorie.js";
import { BaseService } from "./base.service.js";

export class LibraryItemLoanService extends BaseService<libraryItemLoanRepo> {
  constructor() {
    super(new libraryItemLoanRepo());
  }
}
