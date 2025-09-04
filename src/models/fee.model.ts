import { FeeStatus, FeeType } from "./enums";

export interface Fee {
  _id: string;
  student_id?: string | null;
  amount: number;
  due_date?: Date | null;
  status: FeeStatus;
  type: FeeType;
  attachment?: string | null;
  note?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}
