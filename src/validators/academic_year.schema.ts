import { z } from "zod";

export const academicYearSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  name_local: z.string().min(1, "Local name is required"),
  start_month: z.number().min(1).max(12),
  end_month: z.number().min(1).max(12),
  branch_id: z.string().uuid(),
  term_id: z.string().uuid().optional(),
  note: z.string().optional(),
});

export type AcademicYearInput = z.infer<typeof academicYearSchema>;
