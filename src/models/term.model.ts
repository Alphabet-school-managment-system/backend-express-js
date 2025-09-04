export interface Term {
  _id: string;
  branch_id?: string | null;
  name: string;
  start_month?: number | null;
  end_month?: number | null;
}
