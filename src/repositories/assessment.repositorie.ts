import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AssessmentRepository {
  async create(data: any) {
    return prisma.assessment.create({ data });
  }

  async findAll() {
    return prisma.assessment.findMany();
  }

  async findById(id: string) {
    return prisma.assessment.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return prisma.assessment.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.assessment.delete({ where: { id } });
  }
}
