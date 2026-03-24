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
}
