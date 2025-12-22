import { ExpenseController } from "../controllers/expense.controller.js";
import { expenseSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new ExpenseController(), expenseSchema).router;

export default router;
