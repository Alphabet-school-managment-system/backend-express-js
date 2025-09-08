import { LibraryBookService } from "../services/library_book.service";
import {
  libraryBookSchema,
  LibraryBookInput,
} from "../validators/zod.schema";
import { BaseController } from "./base.controller";

export class LibraryBookController extends BaseController<
  LibraryBookService,
  LibraryBookInput
> {
  constructor() {
    super(new LibraryBookService(), libraryBookSchema);
  }
}
