export interface Expense {
  _id: string;
  branch_id?: string | null;
  academic_year_id?: string | null;
  description?: string | null;
  amount: number;
  date?: Date | null;
}
