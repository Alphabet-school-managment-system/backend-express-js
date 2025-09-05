import z from "zod";

export const behaviorSchema = z.object({
  student_id: z.string().uuid().optional().nullable(),
  date: z.date().optional().nullable(),
  description: z.string().optional().nullable(),
  type: z.enum(["Positive", "Negative"]),
});

export type BehaviorInput = z.infer<typeof behaviorSchema>;
