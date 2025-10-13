import { LibraryTransactionController } from "../controllers/library_transaction.controller.ts";
import { libraryTransactionSchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new LibraryTransactionController(), libraryTransactionSchema).router;

export default router;
