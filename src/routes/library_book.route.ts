import { LibraryBookController } from "../controllers/library_book.controller.ts";
import { libraryBookSchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new LibraryBookController(), libraryBookSchema).router;

export default router;
