import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AcademicYearRepository {
  async create(data: any) {
    return prisma.academicyear.create({ data });
  }

  async findAll() {
    return prisma.academicyear.findMany();
  }

  async findById(id: string) {
    return prisma.academicyear.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return prisma.academicyear.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.academicyear.delete({ where: { id } });
  }
}
