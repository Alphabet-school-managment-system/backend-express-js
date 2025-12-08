import { libraryItemLoanRepo } from "../repositories/library_item_loan.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class LibraryItemLoanService extends BaseService<libraryItemLoanRepo> {
  constructor() {
    super(new libraryItemLoanRepo());
  }
}
