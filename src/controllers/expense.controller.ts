import { ExpenseService } from "../services/expense.service.js";
import { expenseSchema,ExpenseInput } from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class ExpenseController extends BaseController<ExpenseService,ExpenseInput> {
  constructor() {
    super(new ExpenseService(), expenseSchema);
  }
}
