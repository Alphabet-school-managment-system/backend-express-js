import z from "zod";

export const classSectionSchema = z.object({
  branch_id: z.string().uuid().optional().nullable(),
  class_name: z.string().max(50).optional().nullable(),
  section_name: z.string().max(50).optional().nullable(),
});

export type ClassSectionInput = z.infer<typeof classSectionSchema>;
