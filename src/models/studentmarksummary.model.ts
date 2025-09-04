import { Gender } from "./enums";

export interface StudentMarkSummary {
  _id: string;
  full_name?: string | null;
  full_name_local?: string | null;
  gender?: Gender | null;
  ay_name?: string | null;
  ay_name_local?: string | null;
  subject?: string | null;
  total_score?: number | null;
  average_score?: number | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}
