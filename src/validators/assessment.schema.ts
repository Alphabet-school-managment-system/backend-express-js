import z from "zod";

export const assessmentSchema = z.object({
  term_id: z.string().uuid().optional().nullable(),
  section_id: z.string().uuid().optional().nullable(),
  subject: z.string().max(100),
  max_score: z.number().int(),
});

export type AssessmentInput = z.infer<typeof assessmentSchema>;
