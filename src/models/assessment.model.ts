export interface Assessment {
  _id: string;
  term_id?: string | null;
  section_ids: string[];
  name?: string | null;
  subject: string;
  max_score: number;
  note?: string | null;
  teacher_id?: string | null;
  created_at?: Date;
  updated_at?: Date;
}
