import { ExpenseController } from "../controllers/expense.controller.ts";
import { expenseSchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new ExpenseController(), expenseSchema).router;

export default router;
