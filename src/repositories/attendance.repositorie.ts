import { BaseRepository } from "./base.repositorie.js";

export class AttendanceRepository extends BaseRepository<"attendance"> {
  constructor() {
    super("attendance");
  }
  async findAll(options?: {
    where?: {
      date?: string;
      grade?: string;
      section?: string;
      academic_year_id?: string;
    };
  }) {
    const date = options?.where?.date ?? null;
    const academicYearId = options?.where?.academic_year_id ?? null;
    const grade = options?.where?.grade ?? null;
    const section = options?.where?.section ?? null;

    return await this.prisma.$queryRaw`
      SELECT
        json_build_object(
          'id', e._id,
          'first_name', s.first_name,
          'middle_name', s.middle_name,
          'last_name', s.last_name,
          'image', s.image,
          'student_registration_number', s.student_registration_number
        ) AS info,
        json_build_object(
          'id', a._id,
          'date', COALESCE(a.date, CAST(${date} AS date)),
          'status', COALESCE(a.status, 'Present'),
          'created_at', a.created_at
        ) AS attendance
      FROM enrollment e
      JOIN student s ON s._id = e.student_id
      LEFT JOIN attendance a
        ON a.student_id = e._id
        AND (${date} IS NULL OR a.date = CAST(${date} AS date))
        AND (${academicYearId} IS NULL OR a.academic_year_id = CAST(${academicYearId} AS uuid))
      WHERE (${grade} IS NULL OR e.grade = ${grade})
        AND (${section} IS NULL OR e.section = ${section})
        AND (${academicYearId} IS NULL OR e.academic_year_id = CAST(${academicYearId} AS uuid))
      ORDER BY s.first_name, s.middle_name, s.last_name;
    `;
  }
}
