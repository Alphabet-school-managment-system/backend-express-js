export interface LibraryBook {
  _id: string;
  branch_id?: string | null;
  title: string;
  author?: string | null;
  isbn?: string | null;
  copies_available?: number | null;
}
