export interface Mark {
  _id: string;
  student_id?: string | null;
  assessment_id?: string | null;
  score?: number | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}
