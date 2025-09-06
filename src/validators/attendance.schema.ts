import z from "zod";

export const attendanceSchema = z.object({
  student_id: z.string().uuid().optional().nullable(),
  section_id: z.string().uuid().optional().nullable(),
  date: z.date(),
  status: z.enum(["Present", "Absent", "Excused"]),
});

export type AttendanceInput = z.infer<typeof attendanceSchema>;
