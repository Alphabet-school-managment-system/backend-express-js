import { LeaveStatus } from "./enums";

export interface StudentLeaveRequest {
  _id: string;
  student_id: string;
  reason: string;
  from_date: Date;
  to_date: Date;
}

export interface StaffLeaveRequest {
  _id: string;
  staff_id?: string | null;
  start_date?: Date | null;
  end_date?: Date | null;
  reason?: string | null;
  status: LeaveStatus;
}
