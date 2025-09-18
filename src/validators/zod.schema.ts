import z from "zod";

// StudentMarkSummary
export const studentMarkSummarySchema = z.object({
  full_name: z.string().optional().nullable(),
  full_name_local: z.string().optional().nullable(),
  gender: z.enum(["Male", "Female"]).optional().nullable(),
  ay_name: z.string().optional().nullable(),
  ay_name_local: z.string().optional().nullable(),
  subject: z.string().optional().nullable(),
  total_score: z.number().optional().nullable(),
  average_score: z.number().optional().nullable(),
});
export type StudentMarkSummaryInput = z.infer<typeof studentMarkSummarySchema>;

// Enrollment
export const enrollmentSchema = z.object({
  student_id: z.string().uuid().optional().nullable(),
  section_id: z.string().uuid().optional().nullable(),
  academic_year_id: z.string().uuid().optional().nullable(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});
export type EnrollmentInput = z.infer<typeof enrollmentSchema>;

// ClassSection
export const classSectionSchema = z.object({
  branch_id: z.string().uuid().optional().nullable(),
  class_name: z.string().max(50).optional().nullable(),
  section_name: z.string().max(50).optional().nullable(),
});
export type ClassSectionInput = z.infer<typeof classSectionSchema>;

// Branch
export const branchSchema = z.object({
  school_id: z.string().uuid().optional().nullable(),
  name: z.string().max(100),
  location: z.string().max(255).optional().nullable(),
});
export type BranchInput = z.infer<typeof branchSchema>;

// Behavior
export const behaviorSchema = z.object({
  student_id: z.string().uuid().optional().nullable(),
  date: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  type: z.enum(["Positive", "Negative"]),
});
export type BehaviorInput = z.infer<typeof behaviorSchema>;

// Attendance
export const attendanceSchema = z.object({
  student_id: z.string().uuid().optional().nullable(),
  section_id: z.string().uuid().optional().nullable(),
  date: z.string(),
  status: z.enum(["Present", "Absent", "Excused"]),
});
export type AttendanceInput = z.infer<typeof attendanceSchema>;

// Assessment
export const assessmentSchema = z.object({
  term_id: z.string().uuid().optional().nullable(),
  section_id: z.string().uuid().optional().nullable(),
  subject: z.string().max(100),
  max_score: z.number().int(),
});
export type AssessmentInput = z.infer<typeof assessmentSchema>;

// AcademicYear
export const academicYearSchema = z.object({
  name: z.string().max(100),
  name_local: z.string().max(100).optional().nullable(),
  start_date: z.string().optional().nullable(),
  end_date: z.string().optional().nullable(),
  branch_id: z.string().uuid().optional().nullable(),
  term_id: z.string().uuid().optional().nullable(),
});
export type AcademicYearInput = z.infer<typeof academicYearSchema>;

// Expense
export const expenseSchema = z.object({
  branch_id: z.string().uuid().optional().nullable(),
  academic_year_id: z.string().uuid().optional().nullable(),
  description: z.string().optional().nullable(),
  amount: z.number(),
  date: z.string().optional().nullable(),
});
export type ExpenseInput = z.infer<typeof expenseSchema>;

// Fee
export const feeSchema = z.object({
  student_id: z.string().uuid().optional().nullable(),
  amount: z.number(),
  due_date: z.string().optional().nullable(),
  status: z.enum(["Paid", "Unpaid"]),
  type: z.enum(["Tuition", "Exam", "Other"]),
  attachment: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
});
export type FeeInput = z.infer<typeof feeSchema>;

// FinanceSummary
export const financeSummarySchema = z.object({
  full_name: z.string().optional().nullable(),
  full_name_local: z.string().optional().nullable(),
  gender: z.enum(["Male", "Female"]).optional().nullable(),
  ay_name: z.string().optional().nullable(),
  ay_name_local: z.string().optional().nullable(),
  total_fee: z.number().optional().nullable(),
  total_expense: z.number().optional().nullable(),
  net_balance: z.number().optional().nullable(),
});
export type FinanceSummaryInput = z.infer<typeof financeSummarySchema>;

// LeaveRequest
export const leaveRequestSchema = z.object({
  staff_id: z.string().uuid().optional().nullable(),
  start_date: z.string().optional().nullable(),
  end_date: z.string().optional().nullable(),
  reason: z.string().optional().nullable(),
  status: z.enum(["Pending", "Approved", "Rejected"]),
});
export type LeaveRequestInput = z.infer<typeof leaveRequestSchema>;

// LibraryBook
export const libraryBookSchema = z.object({
  branch_id: z.string().uuid().optional().nullable(),
  title: z.string().max(255),
  author: z.string().max(255).optional().nullable(),
  isbn: z.string().max(50).optional().nullable(),
  copies_available: z.number().optional().nullable().default(0),
});
export type LibraryBookInput = z.infer<typeof libraryBookSchema>;

// LibraryTransaction
export const libraryTransactionSchema = z.object({
  book_id: z.string().uuid().optional().nullable(),
  student_id: z.string().uuid().optional().nullable(),
  teacher_id: z.string().uuid().optional().nullable(),
  issue_date: z.string().optional().nullable(),
  return_date: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  islost: z.boolean().optional().nullable().default(false),
  note: z.string().optional().nullable(),
});
export type LibraryTransactionInput = z.infer<typeof libraryTransactionSchema>;

// Mark
export const markSchema = z.object({
  student_id: z.string().uuid().optional().nullable(),
  assessment_id: z.string().uuid().optional().nullable(),
  score: z.number().optional().nullable(),
});
export type MarkInput = z.infer<typeof markSchema>;

// ParentStudent
export const parentStudentSchema = z.object({
  student_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  type: z.enum(["Mother", "Father", "Guardian"]),
});
export type ParentStudentInput = z.infer<typeof parentStudentSchema>;

// Parent
export const parentSchema = z.object({
  better_auth_id: z.string().uuid().optional().nullable(),
  first_name: z.string().max(100),
  last_name: z.string().max(100),
  phone: z.string().max(50),
  email: z.string().max(100).optional().nullable(),
  gender: z.enum(["Male", "Female"]),
  address: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  branch_id: z.string().uuid().optional().nullable(),
});
export type ParentInput = z.infer<typeof parentSchema>;

// School
export const schoolSchema = z.object({
  name: z.string().max(255),
  address: z.string().optional().nullable(),
  contact: z.string().max(100).optional().nullable(),
  note: z.string().optional().nullable(),
});
export type SchoolInput = z.infer<typeof schoolSchema>;

// Staff
export const staffSchema = z.object({
  better_auth_id: z.string().uuid().optional().nullable(),
  first_name: z.string().max(100),
  last_name: z.string().max(100),
  phone: z.string().max(50).optional().nullable(),
  email: z.string().max(100).optional().nullable(),
  gender: z.enum(["Male", "Female"]),
  role: z.enum(["Librarian", "Accountant", "Admin"]),
  branch_id: z.string().uuid().optional().nullable(),
});
export type StaffInput = z.infer<typeof staffSchema>;

// Student
export const studentSchema = z.object({
  better_auth_id: z.string().uuid().optional().nullable(),
  first_name: z.string().max(100),
  last_name: z.string().max(100),
  full_name_local: z.string().max(200).optional().nullable(),
  gender: z.enum(["Male", "Female"]),
  dob: z.string(),
  address: z.string().optional().nullable(),
  email: z.string().max(100).optional().nullable(),
  phone: z.string().max(50).optional().nullable(),
  note: z.string().optional().nullable(),
  branch_id: z.string().uuid(),
});
export type StudentInput = z.infer<typeof studentSchema>;

// Teacher
export const teacherSchema = z.object({
  better_auth_id: z.string().uuid().optional().nullable(),
  first_name: z.string().max(100),
  last_name: z.string().max(100),
  subject_specialization: z.string().max(100).optional().nullable(),
  phone: z.string().max(50).optional().nullable(),
  email: z.string().max(100).optional().nullable(),
  gender: z.enum(["Male", "Female"]),
  note: z.string().optional().nullable(),
  branch_id: z.string().uuid(),
});
export type TeacherInput = z.infer<typeof teacherSchema>;

// Term
export const termSchema = z.object({
  branch_id: z.string().uuid().optional().nullable(),
  name: z.string().max(100),
  start_month: z.number().int().optional().nullable(),
  end_month: z.number().int().optional().nullable(),
});
export type TermInput = z.infer<typeof termSchema>;
