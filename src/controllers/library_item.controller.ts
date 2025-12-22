import { LibraryItemService } from "../services/library_item.service.js";
import {
  libraryItemSchema,
  LibraryItemInput,
} from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class LibraryItemController extends BaseController<
  LibraryItemService,
  LibraryItemInput
> {
  constructor() {
    super(new LibraryItemService(), libraryItemSchema);
  }
}
