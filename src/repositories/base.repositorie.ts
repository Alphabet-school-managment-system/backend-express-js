import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { auth_signup, get_random_password } from "../routes/auth.route.ts";

export const prisma = new PrismaClient();

export class BaseRepository<
  TModel extends keyof PrismaClient,
  TCreate = any,
  TUpdate = any
> {
  protected model: any;
  protected modelName: any;

  protected prisma = new PrismaClient();

  constructor(model: TModel) {
    this.model = (prisma as any)[model];
    this.modelName = model.toString();
  }

  async create(data: TCreate, res: Response, signal?: AbortSignal) {
    try {
      return await this.model.create({ data, signal });
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

  // peoples
  async create_people(data: any, res: Response, signal?: AbortSignal) {
    const { first_name, middle_name, email } = data;

    const password = get_random_password();

    return auth_signup({
      data: { name: `${first_name} ${middle_name}`, email, password },
      after_func: async ({ better_auth_id, tx }) => {
        await tx[this.modelName].create({
          data: {
            ...data,
            better_auth_id,
          },
          signal,
        });
      },
      res: res,
      includePasswordInEmailTemplate: true,
    });
  }

  async delete_people(id: string, signal?: AbortSignal) {
    try {
      const user = await this.model.findUnique({ where: { id }, signal });

      return await prisma.$transaction(async (tx) => {
        await (tx as any)[this.modelName].delete({ where: { id } });
        await tx["user"].delete({ where: { id: user.better_auth_id } });
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(
        "%csrc/repositories/base.repositorie.ts:149 error",
        "color: #007acc;",
        error
      );
      throw new Error(
        "An unexpected error occurred while doing operations with the database"
      );
    } else {
      console.log(
        "%csrc/repositories/base.repositorie.ts:154 error",
        "color: #007acc;",
        error
      );
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
