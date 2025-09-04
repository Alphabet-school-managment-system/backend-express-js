import { StaffRole } from "./enums";

export interface Staff {
  _id: string;
  better_auth_id?: string | null;
  first_name: string;
  last_name: string;
  role: StaffRole;
  branch_id?: string | null;
}
