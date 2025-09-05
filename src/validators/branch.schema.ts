import z from "zod";

export const branchSchema = z.object({
  school_id: z.string().uuid().optional().nullable(),
  name: z.string().max(100),
  location: z.string().max(255).optional().nullable(),
});

export type BranchInput = z.infer<typeof branchSchema>;
