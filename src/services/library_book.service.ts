import { libraryBookRepo } from "../repositories/library_book.repositorie";
import { BaseService } from "./base.service";

export class LibraryBookService extends BaseService<libraryBookRepo> {
  constructor() {
    super(new libraryBookRepo());
  }
}
