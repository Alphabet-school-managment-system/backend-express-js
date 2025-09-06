import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class BaseRepository<
  TModel extends keyof PrismaClient,
  TCreate = any,
  TUpdate = any
> {
  protected model: any;

  constructor(model: TModel) {
    this.model = (prisma as any)[model];
  }

  async create(data: TCreate) {
    return this.model.create({ data });
  }

  async findAll() {
    return this.model.findMany();
  }

  async findById(id: string) {
    return this.model.findUnique({ where: { id } });
  }

  async update(id: string, data: TUpdate) {
    return this.model.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.model.delete({ where: { id } });
  }
}
