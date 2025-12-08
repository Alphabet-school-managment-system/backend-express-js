import { LibraryItemController } from "../controllers/library_item.controller.ts";
import { libraryItemSchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new LibraryItemController(), libraryItemSchema).router;

export default router;
