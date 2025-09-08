import { LibraryTransactionService } from "../services/library_transaction.service";
import {
  libraryTransactionSchema,
  LibraryTransactionInput,
} from "../validators/zod.schema";
import { BaseController } from "./base.controller";

export class LibraryTransactionController extends BaseController<
  LibraryTransactionService,
  LibraryTransactionInput
> {
  constructor() {
    super(new LibraryTransactionService(), libraryTransactionSchema);
  }
}
