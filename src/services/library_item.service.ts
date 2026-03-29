import { libraryItemRepo } from "../repositories/library_item.repositorie.js";
import { BaseService } from "./base.service.js";

export class LibraryItemService extends BaseService<libraryItemRepo> {
  constructor() {
    super(new libraryItemRepo());
  }

  async findById(id: string): Promise<any>;
  async findById(
    id: string,
    userId?: string,
    signal?: AbortSignal,
  ): Promise<any>;
  async findById(id: string, userId?: string, signal?: AbortSignal) {
    return this.repository.findById(id, userId, signal);
  }
}
