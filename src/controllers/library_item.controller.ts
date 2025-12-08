import { LibraryItemService } from "../services/library_item.service.ts";
import {
  libraryItemSchema,
  LibraryItemInput,
} from "../validators/zod.schema.ts";
import { BaseController } from "./base.controller.ts";

export class LibraryItemController extends BaseController<
  LibraryItemService,
  LibraryItemInput
> {
  constructor() {
    super(new LibraryItemService(), libraryItemSchema);
  }
}
