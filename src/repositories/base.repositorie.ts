import { PrismaClient } from "@prisma/client";
import { Request } from "express";

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

  async findAll(req: Request) {
    const { sort_by, sort_dir, limit } = req.query;

    const orderBy = sort_by
      ? {
          [sort_by as string]: sort_dir
            ? sort_dir === "desc"
              ? "desc"
              : "asc"
            : "desc",
        }
      : undefined;

    const take = limit ? parseInt(limit as string, 10) : 10;

    return this.model.findMany({
      orderBy,
      take,
    });
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
