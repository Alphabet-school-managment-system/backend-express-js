export interface Teacher {
  _id: string;
  better_auth_id: string | null;
  first_name: string;
  last_name: string;
  subject_specialization: string | null;
  phone: string | null;
  email: string | null;
  note?: string | null;
  branch_id?: string | null;
}
