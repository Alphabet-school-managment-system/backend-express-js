export interface Parent {
  _id: string;
  better_auth_id?: string | null;
  first_name: string;
  last_name: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  note?: string | null;
  branch_id?: string | null;
}
