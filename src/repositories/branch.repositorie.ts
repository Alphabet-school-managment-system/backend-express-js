import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class BranchRepository {
  async create(data: any) {
    return prisma.branch.create({ data });
  }

  async findAll() {
    return prisma.branch.findMany();
  }

  async findById(id: string) {
    return prisma.branch.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return prisma.branch.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.branch.delete({ where: { id } });
  }
}
