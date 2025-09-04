import { Day } from "./enums";

export interface Timetable {
  _id: string;
  class_section_id?: string | null;
  teacher_id?: string | null;
  day: Day;
  period: number;
  note?: string | null;
}
