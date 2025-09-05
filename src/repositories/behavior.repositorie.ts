import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class BehaviorRepository {
  async create(data: any) {
    return prisma.behavior.create({ data });
  }

  async findAll() {
    return prisma.behavior.findMany();
  }

  async findById(id: string) {
    return prisma.behavior.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return prisma.behavior.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.behavior.delete({ where: { id } });
  }
}
