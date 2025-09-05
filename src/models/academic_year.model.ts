import { Day } from "./enums";

export interface AcademicYear {
  _id: string;
  branch_id?: string | null;
  name: string;
  name_local?: string | null;
  start_date?: Date | null;
  end_date?: Date | null;
  term_id?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}
