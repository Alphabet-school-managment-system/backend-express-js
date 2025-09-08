import z from "zod";

// Expense
export const expenseSchema = z.object({
  branch_id: z.string().uuid().optional().nullable(),
  academic_year_id: z.string().uuid().optional().nullable(),
  description: z.string().optional().nullable(),
  amount: z.number(),
  date: z.date().optional().nullable(),
});
export type ExpenseInput = z.infer<typeof expenseSchema>;

// Fee
export const feeSchema = z.object({
  student_id: z.string().uuid().optional().nullable(),
  amount: z.number(),
  due_date: z.date().optional().nullable(),
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
  start_date: z.date().optional().nullable(),
  end_date: z.date().optional().nullable(),
  reason: z.string().optional().nullable(),
  status: z.enum(["Pending", "Approved", "Rejected"]),
});
export type LeaveRequestInput = z.infer<typeof leaveRequestSchema>;

// LibraryBook
export const libraryBookSchema = z.object({
  branch_id: z.string().uuid().optional().nullable(),
  title: z.string(),
  author: z.string().optional().nullable(),
  isbn: z.string().optional().nullable(),
  copies_available: z.number().optional().nullable(),
});
export type LibraryBookInput = z.infer<typeof libraryBookSchema>;

// LibraryTransaction
export const libraryTransactionSchema = z.object({
  book_id: z.string().uuid().optional().nullable(),
  student_id: z.string().uuid().optional().nullable(),
  teacher_id: z.string().uuid().optional().nullable(),
  issue_date: z.date().optional().nullable(),
  return_date: z.date().optional().nullable(),
  status: z.string().optional().nullable(),
  islost: z.boolean().optional().nullable(),
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
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  branch_id: z.string().uuid().optional().nullable(),
});
export type ParentInput = z.infer<typeof parentSchema>;

// School
export const schoolSchema = z.object({
  name: z.string(),
  address: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
});
export type SchoolInput = z.infer<typeof schoolSchema>;

// Staff
export const staffSchema = z.object({
  better_auth_id: z.string().uuid().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.enum(["Librarian", "Accountant"]),
  branch_id: z.string().uuid().optional().nullable(),
});
export type StaffInput = z.infer<typeof staffSchema>;

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

// Student
export const studentSchema = z.object({
  better_auth_id: z.string().uuid().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  full_name_local: z.string().optional().nullable(),
  gender: z.enum(["Male", "Female"]).optional().nullable(),
  dob: z.date().optional().nullable(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  branch_id: z.string().uuid().optional().nullable(),
});
export type StudentInput = z.infer<typeof studentSchema>;

// Teacher
export const teacherSchema = z.object({
  better_auth_id: z.string().uuid().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  subject_specialization: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  branch_id: z.string().uuid().optional().nullable(),
});
export type TeacherInput = z.infer<typeof teacherSchema>;

// Term
export const termSchema = z.object({
  branch_id: z.string().uuid().optional().nullable(),
  name: z.string(),
  start_month: z.number().optional().nullable(),
  end_month: z.number().optional().nullable(),
});
export type TermInput = z.infer<typeof termSchema>;
