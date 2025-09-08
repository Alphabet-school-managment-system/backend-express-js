import { LibraryBookController } from "../controllers/library_book.controller";
import { libraryBookSchema } from "../validators/zod.schema";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new LibraryBookController(), libraryBookSchema).router;

export default router;
