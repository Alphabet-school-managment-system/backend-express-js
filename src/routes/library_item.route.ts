import { LibraryItemController } from "../controllers/library_item.controller.js";
import { libraryItemSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new LibraryItemController(), libraryItemSchema).router;

export default router;
