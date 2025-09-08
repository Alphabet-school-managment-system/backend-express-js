import z from "zod";

export const enrollmentSchema = z.object({
  student_id: z.string().uuid().optional().nullable(),
  section_id: z.string().uuid().optional().nullable(),
  academic_year_id: z.string().uuid().optional().nullable(),
});

export type EnrollmentInput = z.infer<typeof enrollmentSchema>;