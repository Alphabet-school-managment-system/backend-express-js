import { ExpenseService } from "../services/expense.service.ts";
import { expenseSchema,ExpenseInput } from "../validators/zod.schema.ts";
import { BaseController } from "./base.controller.ts";

export class ExpenseController extends BaseController<ExpenseService,ExpenseInput> {
  constructor() {
    super(new ExpenseService(), expenseSchema);
  }
}
