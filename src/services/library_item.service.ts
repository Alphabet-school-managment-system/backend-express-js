import { libraryItemRepo } from "../repositories/library_item.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class LibraryItemService extends BaseService<libraryItemRepo> {
  constructor() {
    super(new libraryItemRepo());
  }
}
