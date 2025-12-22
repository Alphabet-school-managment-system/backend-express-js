import { LibraryItemLoanController } from "../controllers/library_item_loan.controller.js";
import { libraryItemLoanSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new LibraryItemLoanController(), libraryItemLoanSchema).router;

export default router;
