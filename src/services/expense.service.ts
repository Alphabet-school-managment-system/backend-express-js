import { expenseRepo } from "../repositories/expense.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class ExpenseService extends BaseService<expenseRepo> {
  constructor() {
    super(new expenseRepo());
  }
}
