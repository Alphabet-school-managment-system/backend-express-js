import { LibraryBookService } from "../services/library_book.service.ts";
import {
  libraryBookSchema,
  LibraryBookInput,
} from "../validators/zod.schema.ts";
import { BaseController } from "./base.controller.ts";

export class LibraryBookController extends BaseController<
  LibraryBookService,
  LibraryBookInput
> {
  constructor() {
    super(new LibraryBookService(), libraryBookSchema);
  }
}
