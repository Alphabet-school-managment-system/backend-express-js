import { libraryBookRepo } from "../repositories/library_book.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class LibraryBookService extends BaseService<libraryBookRepo> {
  constructor() {
    super(new libraryBookRepo());
  }
}
