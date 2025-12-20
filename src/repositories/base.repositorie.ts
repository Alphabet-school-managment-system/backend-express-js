import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";

export const prisma = new PrismaClient();

export class BaseRepository<
  TModel extends keyof PrismaClient,
  TCreate = any,
  TUpdate = any
> {
  protected model: any;

  protected prisma = new PrismaClient();

  constructor(model: TModel) {
    this.model = (prisma as any)[model];
  }

  async create(data: TCreate, res: Response, signal?: AbortSignal) {
    try {
      return await this.model.create({ data, res, signal });
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(options: {
    where?: any;
    orderBy?: any;
    take?: number;
    signal?: AbortSignal;
  }) {
    const { where, orderBy, take, signal } = options;
    try {
      return await this.model.findMany(
        {
          where,
          orderBy,
          take,
        },
        { signal }
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async findById(id: string, signal?: AbortSignal) {
    try {
      return await this.model.findUnique({ where: { id }, signal });
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, data: TUpdate, signal?: AbortSignal) {
    try {
      return await this.model.update({ where: { id }, data, signal });
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(id: string, signal?: AbortSignal) {
    try {
      return await this.model.delete({ where: { id }, signal });
    } catch (error) {
      this.handleError(error);
    }
  }

  async search(req: Request) {
    try {
      const query = req.query;
      const filters: any[] = [];

      // loop over each query key dynamically
      for (const [key, value] of Object.entries(query)) {
        if (value && typeof value === "string") {
          filters.push({
            [key]: {
              contains: value,
              mode: "insensitive",
            },
          });
        }
      }

      const queryOptions: any = {
        where: {
          OR: filters,
        },
      };

      // Only use signal if it exists
      const signal = (req as any).prismaSignal;

      return await this.model.findMany(queryOptions, { signal });
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(
        "An unexpected error occurred while doing operations with the database"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

export const handleError = (error: unknown): string => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return "An unexpected error occurred while doing operations with the database";
  } else {
    return "An unexpected error occurred";
  }
};
