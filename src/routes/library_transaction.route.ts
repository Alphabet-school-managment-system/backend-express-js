import { LibraryTransactionController } from "../controllers/library_transaction.controller";
import { libraryTransactionSchema } from "../validators/zod.schema";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new LibraryTransactionController(), libraryTransactionSchema).router;

export default router;
