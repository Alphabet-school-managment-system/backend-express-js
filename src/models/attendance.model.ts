import { AttendanceStatus } from "./enums";

export interface Attendance {
  _id: string;
  student_id?: string | null;
  section_id?: string | null;
  date: Date;
  status: AttendanceStatus;
}
