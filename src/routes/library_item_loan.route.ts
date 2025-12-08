import { LibraryItemLoanController } from "../controllers/library_item_loan.controller.ts";
import { libraryItemLoanSchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new LibraryItemLoanController(), libraryItemLoanSchema).router;

export default router;
