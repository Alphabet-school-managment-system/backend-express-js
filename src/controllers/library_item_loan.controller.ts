import { LibraryItemLoanService } from "../services/library_item_loan.service.ts";
import {
  libraryItemLoanSchema,
  LibraryItemLoanInput,
} from "../validators/zod.schema.ts";
import { BaseController } from "./base.controller.ts";

export class LibraryItemLoanController extends BaseController<
  LibraryItemLoanService,
  LibraryItemLoanInput
> {
  constructor() {
    super(new LibraryItemLoanService(), libraryItemLoanSchema);
  }
}
