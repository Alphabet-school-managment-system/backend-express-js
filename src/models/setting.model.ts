export interface Setting {
  id: string;
  number_of_terms: number;
  sections_per_class: number;
  school_id: string | null;
  levels_of_education: string[];
  created_at?: Date | null;
  updated_at?: Date | null;
}
