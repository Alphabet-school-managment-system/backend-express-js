import { BaseRepository } from "./base.repositorie.js";

export class markRepo extends BaseRepository<"mark"> {
  constructor() {
    super("mark");
  }

  async findAll(options?: {
    where?: {
      assessment_id?: string;
      grade?: string;
      section?: string;
    };
  }) {
    const assessment = await this.prisma.assessment.findUnique({
      where: { id: options?.where?.assessment_id },
      select: { id: true, max_score: true, title: true, subject: true },
    });
    const enrollments = await this.prisma.enrollment.findMany({
      where: {
        ...(options?.where?.grade && { grade: options.where.grade }),
        ...(options?.where?.section && { section: options.where.section }),
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
        mark: {
          where: { assessment_id: options?.where?.assessment_id },
          select: { score: true, id: true },
        },
      },
    });

    return { students: enrollments, assessment };
  }

  async myAssessments(options: {
    student_id: string;
    grade: string;
    section?: string;
    subject?: string;
    academic_year_id: string;
  }) {
    const { student_id, grade, section, academic_year_id, subject } = options;

    if (!student_id) {
      this.handleError("student_id is required.");
    }

    if (!grade) {
      this.handleError("grade is required.");
    }

    const assessments = await this.prisma.assessment.findMany({
      where: {
        grade,
        ...(subject ? { subject } : {}),
        ...(section
          ? {
              OR: [{ section }, { section: null }],
            }
          : {}),
        ...(academic_year_id ? { academic_year_id } : {}),
      },
      select: {
        id: true,
        title: true,
        subject: true,
        max_score: true,
        note: true,
        created_at: true,
        mark: {
          where: { student_id },
          select: {
            score: true,
          },
          take: 1,
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return assessments.map((assessment) => ({
      ...assessment,
      mark: assessment.mark[0] ?? { score: null },
    }));
  }
}
