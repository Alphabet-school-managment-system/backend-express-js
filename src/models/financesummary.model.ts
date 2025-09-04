import { Gender } from "./enums";

export interface FinanceSummary {
  _id: string;
  full_name?: string | null;
  full_name_local?: string | null;
  gender?: Gender | null;
  ay_name?: string | null;
  ay_name_local?: string | null;
  total_fee?: number | null;
  total_expense?: number | null;
  net_balance?: number | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}