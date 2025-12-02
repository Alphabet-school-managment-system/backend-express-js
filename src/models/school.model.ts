export interface School {
  _id: string;
  name: string;
  address: string | null;
  contact: string | null;
  note?: string | null;
  better_auth_id?: string | null;
}
