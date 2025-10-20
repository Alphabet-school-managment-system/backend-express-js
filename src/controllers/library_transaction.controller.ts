import { LibraryTransactionService } from "../services/library_transaction.service.ts";
import {
  libraryTransactionSchema,
  LibraryTransactionInput,
} from "../validators/zod.schema.ts";
import { BaseController } from "./base.controller.ts";

export class LibraryTransactionController extends BaseController<
  LibraryTransactionService,
  LibraryTransactionInput
> {
  constructor() {
    super(new LibraryTransactionService(), libraryTransactionSchema);
  }
}
