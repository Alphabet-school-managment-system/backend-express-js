import { ExpenseType } from "./enums";

export interface Expense {
  _id: string;
  branch_id?: string | null;
  academic_year_id?: string | null;
  title?: string;
  type: ExpenseType;
  description?: string | null;
  amount: number;
  date?: Date | null;
}
