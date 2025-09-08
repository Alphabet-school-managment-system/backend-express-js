import { ExpenseController } from "../controllers/expense.controller";
import { expenseSchema } from "../validators/zod.schema";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new ExpenseController(), expenseSchema).router;

export default router;
