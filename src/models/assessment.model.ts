export interface Assessment {
  _id: string;
  term_id?: string | null;
  section_id?: string | null;
  subject: string;
  max_score: number;
}
