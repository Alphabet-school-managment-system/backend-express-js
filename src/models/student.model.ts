import { Gender } from "./enums";

export interface Student {
  _id: string;
  better_auth_id?: string | null;
  first_name: string;
  last_name: string;
  full_name_local?: string | null;
  gender?: Gender | null;
  dob?: Date | null;
  address?: string | null;
  phone?: string | null;
  note?: string | null;
  branch_id?: string | null;
}
