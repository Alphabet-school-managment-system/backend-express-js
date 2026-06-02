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
    const attendanceDate = date
      ? new Date(`${date}T00:00:00.000Z`)
      : undefined;

    const enrollments = await this.prisma.enrollment.findMany({
      where: {
        ...(grade ? { grade } : {}),
        ...(section ? { section } : {}),
        ...(academicYearId ? { academic_year_id: academicYearId } : {}),
      },
      select: {
        id: true,
        student: {
          select: {
            first_name: true,
            middle_name: true,
            last_name: true,
            image: true,
            student_registration_number: true,
          },
        },
        attendance: {
          where: {
            ...(attendanceDate ? { date: attendanceDate } : {}),
            ...(academicYearId ? { academic_year_id: academicYearId } : {}),
          },
          select: {
            id: true,
            date: true,
            status: true,
            created_at: true,
          },
          orderBy: {
            created_at: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        student: {
          first_name: "asc",
        },
      },
    });

    return enrollments.map((enrollment) => ({
      info: {
        id: enrollment.id,
        ...enrollment.student,
      },
      attendance: enrollment.attendance[0] ?? null,
    }));
  }
}
