import { expenseRepo } from "../repositories/expense.repositorie";
import { BaseService } from "./base.service";

export class ExpenseService extends BaseService<expenseRepo> {
  constructor() {
    super(new expenseRepo());
  }
}
