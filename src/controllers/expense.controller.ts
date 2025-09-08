import { ExpenseService } from "../services/expense.service";
import { expenseSchema,ExpenseInput } from "../validators/zod.schema";
import { BaseController } from "./base.controller";

export class ExpenseController extends BaseController<ExpenseService,ExpenseInput> {
  constructor() {
    super(new ExpenseService(), expenseSchema);
  }
}
