export interface LibraryTransaction {
  _id: string;
  book_id?: string | null;
  student_id?: string | null;
  teacher_id?: string | null;
  issue_date?: Date | null;
  return_date?: Date | null;
  status?: string | null;
  islost?: boolean | null;
  note?: string | null;
}

