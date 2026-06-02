import z from "zod";

const MAX_LEARNING_MATERIAL_FILE_SIZE_BYTES = 200 * 1024 * 1024;

// Enums
export enum AttendanceStatus {
  Present = "Present",
  Absent = "Absent",
  Excused = "Excused",
}

export enum BehaviorType {
  Positive = "Positive",
  Negative = "Negative",
}

export enum Day {
  Mon = "Mon",
  Tue = "Tue",
  Wed = "Wed",
  Thu = "Thu",
  Fri = "Fri",
  Sat = "Sat",
  Sun = "Sun",
}

export enum FeeStatus {
  Paid = "Paid",
  Unpaid = "Unpaid",
}

export enum FeeType {
  Tuition = "Tuition",
  Exam = "Exam",
  Other = "Other",
}

export enum ExpenseType {
  Salary = "Salary",
  Rent = "Rent",
  Other = "Other",
}

export enum Sex {
  Male = "Male",
  Female = "Female",
}

export enum LeaveStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

export enum ParentType {
  Mother = "Mother",
  Father = "Father",
  Brother = "Brother",
  Sister = "Sister",
  Aunt = "Aunt",
  Uncle = "Uncle",
  Guardian = "Guardian",
  Other = "Other",
}

export enum StaffRole {
  Librarian = "Librarian",
  Accountant = "Accountant",
  Admin = "Admin",
}

export enum Stream {
  Natural_Sciences = "Natural_Sciences",
  Social_Sciences = "Social_Sciences",
}

export enum LibraryItemType {
  BOOK = "book",
  MAGAZINE = "magazine",
  JOURNAL = "journal",
  E_BOOK = "e_book",
  AUDIO_BOOK = "audio_book",
  REFERENCE_BOOK = "reference_book",
  OTHER = "other",
}

export enum BorrowStatus {
  RETURNED = "RETURNED",
  BORROWED = "BORROWED",
  RESERVED = "RESERVED",
  OVERDUE = "OVERDUE",
  LOST = "LOST",
  DAMAGED = "DAMAGED",
}

export enum LearningMaterialStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum LearningMaterialFileType {
  DOCUMENT = "document",
  VIDEO = "video",
}

export enum LearningMaterialSource {
  LINK = "link",
  FILE = "file",
}

export const signupSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().max(100),
  password: z.string().min(5).max(12),
  school_name: z.string().max(50),
});

export type SignupInput = z.infer<typeof signupSchema>;

export const academicYearSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  branch_id: z.string().uuid(),
  name: z.string().max(100),
  name_local: z.string().max(100),
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  enrollment_start: z.coerce.date(),
  enrollment_end: z.coerce.date(),
  created_at: z.coerce.date().nullable().optional(),
  updated_at: z.coerce.date().nullable().optional(),
});

const createAcademicYearSchema = academicYearSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type AcademicYearInput = z.infer<typeof createAcademicYearSchema>;

export const assessmentSchema = z.object({
  academic_year_id: z.string().uuid(),
  title: z.string().trim().min(1, "required").max(50, "Max 50 characters"),
  subject: z.string().trim(),
  grade: z.string().max(100).trim(),
  section: z.string().max(100).trim().optional(),
  max_score: z.coerce
    .number({ message: "required" })
    .int("Max score must be a whole number")
    .min(1, "Max score must be at least 1")
    .max(100, "Max score cannot exceed 100"),
  note: z.string().max(250).nullable().optional(),
  teacher_id: z.string().uuid().nullable().optional(),
  created_at: z.coerce.date().nullable().optional(),
  updated_at: z.coerce.date().nullable().optional(),
});

export const attendanceSchema = z.object({
  academic_year_id: z.string().uuid(),
  term: z.string().max(100).optional(),
  student_id: z.string().uuid(),
  date: z.coerce.date(),
  created_at: z.coerce.date().nullable().optional(),
  updated_at: z.coerce.date().nullable().optional(),
  status: z.nativeEnum(AttendanceStatus),
});

const createAttendanceSchema = attendanceSchema.omit({
  created_at: true,
  updated_at: true,
});

export type AttendanceInput = z.infer<typeof createAttendanceSchema>;

export const behaviorSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  academic_year_id: z.string().uuid(),
  term: z.string().max(100).nullable().optional(),
  student_id: z.string().uuid(),
  teacher_id: z.string().uuid().nullable().optional(),
  date: z.coerce.date(),
  description: z.string().nullable().optional(),
  type: z.nativeEnum(BehaviorType),
  branchId: z.string().uuid().nullable().optional(),
});

const createBehaviorSchema = behaviorSchema.omit({
  id: true,
});

export type BehaviorInput = z.infer<typeof createBehaviorSchema>;

export const branchSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  name: z.string().max(100),
  location: z.string().max(255).nullable().optional(),
  isCurrent: z.boolean().optional(),
  isDefault: z.boolean().optional(),
});

const createBranchSchema = branchSchema.omit({
  id: true,
});

export type BranchInput = z.infer<typeof createBranchSchema>;

export const enrollmentSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  academic_year_id: z.string().uuid(),
  student_id: z.string().uuid(),
  grade: z.string(),
  section: z.string().max(100).nullable().optional(),
  isTransferred: z.boolean().nullable().optional(),
  transferredFrom: z.string().max(100).nullable().optional(),
  stream: z.nativeEnum(Stream).nullable().optional(),
  note: z.string().max(255).nullable().optional(),
  created_at: z.coerce.date().nullable().optional(),
  updated_at: z.coerce.date().nullable().optional(),
});

const createEnrollmentSchema = enrollmentSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type EnrollmentInput = z.infer<typeof createEnrollmentSchema>;

export const expenseSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  academic_year_id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable().optional(),
  type: z.nativeEnum(ExpenseType),
  other_type: z.string().max(255).nullable().optional(),
  amount: z.number(),
  date: z.coerce.date(),
  receipt: z.string().max(255).nullable().optional(),
});

const createExpenseSchema = expenseSchema.omit({
  id: true,
});

export type ExpenseInput = z.infer<typeof createExpenseSchema>;

export const feeSchema = z.object({
  id: z.string().uuid(),
  academic_year_id: z.string().uuid(),
  student_id: z.string().uuid(),
  amount: z.number(),
  due_date: z.coerce.date().nullable().optional(),
  status: z.nativeEnum(FeeStatus),
  type: z.nativeEnum(FeeType),
  other_type: z.string().max(255).nullable().optional(),
  receipt: z.string().max(255).nullable().optional(),
  note: z.string().nullable().optional(),
  created_at: z.coerce.date().nullable().optional(),
  updated_at: z.coerce.date().nullable().optional(),
});

const createFeeSchema = feeSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type FeeInput = z.infer<typeof createFeeSchema>;

export const financeSummarySchema = z.object({
  id: z.string().uuid(),
  full_name: z.string().max(200).nullable().optional(),
  full_name_local: z.string().max(200).nullable().optional(),
  sex: z.nativeEnum(Sex).nullable().optional(),
  ay_name: z.string().max(100).nullable().optional(),
  ay_name_local: z.string().max(100).nullable().optional(),
  total_fee: z.number().nullable().optional(),
  total_expense: z.number().nullable().optional(),
  net_balance: z.number().nullable().optional(),
  created_at: z.coerce.date().nullable().optional(),
  updated_at: z.coerce.date().nullable().optional(),
});

const createFinanceSummarySchema = financeSummarySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type FinanceSummaryInput = z.infer<typeof createFinanceSummarySchema>;

export const leaveRequestSchema = z.object({
  id: z.string().uuid().optional(),
  academic_year_id: z.string().uuid(),
  student_id: z.string().uuid().nullable().optional(),
  teacher_id: z.string().uuid().nullable().optional(),
  staff_id: z.string().uuid().nullable().optional(),
  start_date: z.coerce.date().nullable().optional(),
  end_date: z.coerce.date().nullable().optional(),
  note: z.string().nullable().optional(),
  status: z.nativeEnum(LeaveStatus).optional().default(LeaveStatus.Pending),
});

const createLeaveRequestSchema = leaveRequestSchema.omit({
  id: true,
});

export type LeaveRequestInput = z.infer<typeof createLeaveRequestSchema>;

export const libraryItemSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  branch_id: z.string().uuid().optional(),
  registration_number: z.string().nullable().optional(),
  title: z.string().max(255),
  author: z.string().max(255),
  item_type: z.nativeEnum(LibraryItemType),
  subject: z.string().max(50),
  isbn: z.string().max(50).nullable().optional(),
  copies_available: z.number().int().min(1),
  publication_date: z.coerce.date(),
  note: z.string().nullable().optional(),
});

const createLibraryItemSchema = libraryItemSchema.omit({
  id: true,
});

export type LibraryItemInput = z.infer<typeof createLibraryItemSchema>;

export const libraryItemLoanSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  item_id: z.string().uuid(),
  student_id: z.string().uuid().nullable().optional(),
  teacher_id: z.string().uuid().nullable().optional(),
  issue_date: z.coerce.date(),
  return_date: z.coerce.date(),
  status: z.nativeEnum(BorrowStatus),
  note: z.string().nullable().optional(),
  branchId: z.string().uuid().nullable().optional(),
});

const createLibraryItemLoanSchema = libraryItemLoanSchema.omit({
  id: true,
});

export type LibraryItemLoanInput = z.infer<typeof createLibraryItemLoanSchema>;

const learningMaterialBaseSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title must be 255 characters or less"),
  description: z.string().nullable().optional(),
  material_url: z.string().trim().optional(),
  material_file: z.any().optional(),
  material_type: z.nativeEnum(LearningMaterialFileType),
  material_size: z.coerce
    .number()
    .int()
    .nonnegative()
    .max(
      MAX_LEARNING_MATERIAL_FILE_SIZE_BYTES,
      "File size must be 200 MB or less.",
    ),
  uploaded_by: z.string().uuid(),
  branch_id: z.string().uuid(),
  school_id: z.string().uuid().optional(),
  grade: z.string().max(50).optional(),
  subject: z.string().max(100).optional(),
  material_source: z
    .nativeEnum(LearningMaterialSource)
    .optional()
    .default(LearningMaterialSource.LINK),
  status: z
    .nativeEnum(LearningMaterialStatus)
    .optional()
    .default(LearningMaterialStatus.DRAFT),
  created_at: z.coerce.date().nullable().optional(),
  updated_at: z.coerce.date().nullable().optional(),
});

const validateLearningMaterialCreate = (
  data: z.infer<typeof learningMaterialBaseSchema>,
  ctx: z.RefinementCtx,
) => {
  const materialUrl = data.material_url?.trim();

  if (data.material_source === LearningMaterialSource.LINK) {
    if (!materialUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["material_url"],
        message: "Material URL is required for linked materials.",
      });
    } else if (!z.string().url().safeParse(materialUrl).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["material_url"],
        message: "Enter a valid URL for linked materials.",
      });
    }
  }

  if (data.material_source === LearningMaterialSource.FILE) {
    if (!data.material_file) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["material_file"],
        message: "Select a PDF or MP4 file.",
      });
    }

    if (data.material_size <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["material_size"],
        message: "File size is required for uploaded files.",
      });
    } else if (data.material_size > MAX_LEARNING_MATERIAL_FILE_SIZE_BYTES) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["material_size"],
        message: "File size must be 200 MB or less.",
      });
    }
  }
};

export const learningMaterialSchema = learningMaterialBaseSchema.superRefine(
  validateLearningMaterialCreate,
);

const createLearningMaterialSchema = learningMaterialBaseSchema
  .omit({
    id: true,
    created_at: true,
    updated_at: true,
  })
  .superRefine(validateLearningMaterialCreate);

export type LearningMaterialInput = z.infer<
  typeof createLearningMaterialSchema
>;

const learningMaterialUpdateBaseSchema = learningMaterialBaseSchema.extend({
  material_size: z.coerce
    .number()
    .int()
    .nonnegative()
    .max(
      MAX_LEARNING_MATERIAL_FILE_SIZE_BYTES,
      "File size must be 200 MB or less.",
    )
    .optional(),
});

const validateLearningMaterialUpdate = (
  data: z.infer<typeof learningMaterialUpdateBaseSchema>,
  ctx: z.RefinementCtx,
) => {
  const materialUrl = data.material_url?.trim();

  if (data.material_source === LearningMaterialSource.LINK) {
    if (!materialUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["material_url"],
        message: "Material URL is required for linked materials.",
      });
    } else if (!z.string().url().safeParse(materialUrl).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["material_url"],
        message: "Enter a valid URL for linked materials.",
      });
    }
  }

  if (data.material_source === LearningMaterialSource.FILE) {
    if (!data.material_file && !materialUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["material_url"],
        message: "Keep the existing file URL or select a new PDF or MP4 file.",
      });
    }

    if (
      data.material_file &&
      (typeof data.material_size !== "number" || data.material_size <= 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["material_size"],
        message: "File size is required for uploaded files.",
      });
    } else if (
      typeof data.material_size === "number" &&
      data.material_size > MAX_LEARNING_MATERIAL_FILE_SIZE_BYTES
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["material_size"],
        message: "File size must be 200 MB or less.",
      });
    }
  }
};

export const learningMaterialUpdateSchema = learningMaterialUpdateBaseSchema
  .omit({
    created_at: true,
    updated_at: true,
  })
  .superRefine(validateLearningMaterialUpdate);

export type LearningMaterialUpdateInput = z.infer<
  typeof learningMaterialUpdateSchema
>;

export const markSchema = z.object({
  assessment_id: z.string().uuid("Invalid assessment id"),
  student_id: z.string().uuid("Invalid student id"),
  score: z.coerce
    .number({ message: "required" })
    .min(0, "Score must be at least 0")
    .max(100, "Score cannot exceed 100"),
  created_at: z.coerce.date().nullable().optional(),
  updated_at: z.coerce.date().nullable().optional(),
});

const createMarkSchema = markSchema.omit({
  created_at: true,
  updated_at: true,
});

export type MarkInput = z.infer<typeof createMarkSchema>;

export const schoolSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(255),
  address: z.string().nullable().optional(),
  contact: z.string().max(100).nullable().optional(),
  note: z.string().nullable().optional(),
  better_auth_id: z.string().max(255).optional(),
});

const createSchoolSchema = schoolSchema.omit({
  id: true,
});

export type SchoolInput = z.infer<typeof createSchoolSchema>;

export const parentSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  branch_id: z.string().uuid(),
  first_name: z.string().max(100),
  middle_name: z.string().max(100),
  phone: z.string().max(50),
  email: z.string().max(100),
  sex: z.nativeEnum(Sex),
  address: z.string(),
  note: z.string().nullable().optional(),
  studentRelationsId: z.string().uuid().nullable().optional(),
});

const createParentSchema = parentSchema.omit({
  id: true,
});

export type ParentInput = z.infer<typeof createParentSchema>;

export const staffSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  branch_id: z.string().uuid().nullable().optional(),
  first_name: z.string().max(100),
  middle_name: z.string().max(100),
  phone: z.string().max(50).nullable().optional(),
  email: z.string().max(100),
  sex: z.nativeEnum(Sex).nullable().optional(),
  role: z.nativeEnum(StaffRole),
});

const createStaffSchema = staffSchema.omit({
  id: true,
});

export type StaffInput = z.infer<typeof createStaffSchema>;

export const studentSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  branch_id: z.string().uuid(),
  first_name: z.string().max(100),
  middle_name: z.string().max(100),
  last_name: z.string().max(100),
  full_name_local: z.string().max(200),
  sex: z.nativeEnum(Sex),
  dob: z.coerce.date(),
  address: z.string(),
  email: z.string().max(100),
  phone: z.string().max(50),
  note: z.string().nullable().optional(),
  image: z.string().max(255).nullable().optional(),
});

const createStudentSchema = studentSchema.omit({
  id: true,
});

export type StudentInput = z.infer<typeof createStudentSchema>;

export const teacherSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  first_name: z.string().max(100),
  middle_name: z.string().max(100),
  phone: z.string().max(50),
  email: z.string().max(100),
  sex: z.nativeEnum(Sex),
  subject_specialization: z.string().max(100),
  note: z.string().nullable().optional(),
  image: z.string().max(255).nullable().optional(),
  branch_id: z.string().uuid(),
});

const createTeacherSchema = teacherSchema.omit({
  id: true,
});

export type TeacherInput = z.infer<typeof createTeacherSchema>;

export const studentMarkSummarySchema = z.object({
  id: z.string().uuid(),
  full_name: z.string().max(200).nullable().optional(),
  full_name_local: z.string().max(200).nullable().optional(),
  sex: z.nativeEnum(Sex).nullable().optional(),
  ay_name: z.string().max(100).nullable().optional(),
  ay_name_local: z.string().max(100).nullable().optional(),
  subject: z.string().max(100).nullable().optional(),
  total_score: z.number().nullable().optional(),
  average_score: z.number().nullable().optional(),
  created_at: z.coerce.date().nullable().optional(),
  updated_at: z.coerce.date().nullable().optional(),
});

const createStudentMarkSummarySchema = studentMarkSummarySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type StudentMarkSummaryInput = z.infer<
  typeof createStudentMarkSummarySchema
>;

export const timetableSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  academic_year_id: z.string().uuid(),
  term: z.string().nullable().optional(),
  grade: z.number().int(),
  section: z.string().max(100),
  subject: z.string().max(100),
  teacher_id: z.string().uuid(),
  day: z.nativeEnum(Day),
  period: z.string().max(100),
  note: z.string().nullable().optional(),
});

const createTimetableSchema = timetableSchema.omit({
  id: true,
});

export type TimetableInput = z.infer<typeof createTimetableSchema>;

export const parentStudentSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  student_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  type: z.nativeEnum(ParentType),
});

const createParentStudentSchema = parentStudentSchema.omit({
  id: true,
});

export type ParentStudentInput = z.infer<typeof createParentStudentSchema>;

export const settingSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  school_id: z.string().uuid().nullable().optional(),
  number_of_terms: z.number().int(),
  sections_per_grade: z.number().int(),
  periods_per_day: z.number().int(),
  levels_of_education: z.array(z.string()),
  created_at: z.coerce.date().nullable().optional(),
  updated_at: z.coerce.date().nullable().optional(),
});

const createSettingSchema = settingSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type SettingInput = z.infer<typeof createSettingSchema>;
