export interface Enrollment {
  _id: string;
  student_id?: string | null;
  section_id?: string | null;
  academic_year_id?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}
