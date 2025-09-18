import { PrismaClient, Prisma } from "@prisma/client";
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
    try {
      return await this.model.create({ data });
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(req: Request) {
    try {
      const { sort_by, sort_dir, limit } = req.query;

      const orderBy = sort_by
        ? {
            [sort_by as string]: sort_dir === "desc" ? "desc" : "asc",
          }
        : undefined;

      const take = limit ? parseInt(limit as string, 10) : 10;

      return await this.model.findMany({ orderBy, take });
    } catch (error) {
      this.handleError(error);
    }
  }

  async findById(id: string) {
    try {
      return await this.model.findUnique({ where: { id } });
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, data: TUpdate) {
    try {
      return await this.model.update({ where: { id }, data });
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(id: string) {
    try {
      return await this.model.delete({ where: { id: "" } });
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(
        "An unexpected error occurred while doing operations with the database"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
