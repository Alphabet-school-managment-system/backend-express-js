import { expenseRepo } from "../repositories/expense.repositorie.js";
import { BaseService } from "./base.service.js";

export class ExpenseService extends BaseService<expenseRepo> {
  constructor() {
    super(new expenseRepo());
  }
}
