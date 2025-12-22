import { LibraryItemLoanService } from "../services/library_item_loan.service.js";
import {
  libraryItemLoanSchema,
  LibraryItemLoanInput,
} from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class LibraryItemLoanController extends BaseController<
  LibraryItemLoanService,
  LibraryItemLoanInput
> {
  constructor() {
    super(new LibraryItemLoanService(), libraryItemLoanSchema);
  }
}
