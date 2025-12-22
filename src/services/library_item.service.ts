import { libraryItemRepo } from "../repositories/library_item.repositorie.js";
import { BaseService } from "./base.service.js";

export class LibraryItemService extends BaseService<libraryItemRepo> {
  constructor() {
    super(new libraryItemRepo());
  }
}
