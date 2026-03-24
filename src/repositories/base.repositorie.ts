import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { auth_signup, get_random_password } from "../routes/auth.route.js";
import { get_token } from "../app.js";

export const prisma = new PrismaClient();

export class BaseRepository<
  TModel extends keyof PrismaClient,
  TCreate = any,
  TUpdate = any,
> {
  protected model: any;
  protected modelName: any;
  private modelFieldMap = new Map<string, any>();

  protected prisma = new PrismaClient();

  constructor(model: TModel) {
    this.model = (prisma as any)[model];
    this.modelName = model.toString();

    const modelMeta = Prisma.dmmf.datamodel.models.find(
      ({ name }) => name === this.modelName,
    );
    for (const field of modelMeta?.fields ?? []) {
      this.modelFieldMap.set(field.name, field);
    }
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
        { signal },
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

  private normalizeSearchValue(rawValue: string, field: any) {
    if (field?.kind !== "scalar" && field?.kind !== "enum") return rawValue;

    if (field.kind === "enum") return rawValue;

    switch (field.type) {
      case "Int":
      case "BigInt":
      case "Float":
      case "Decimal": {
        const numericValue = Number(rawValue);
        return Number.isNaN(numericValue) ? rawValue : numericValue;
      }
      case "Boolean":
        if (rawValue === "true") return true;
        if (rawValue === "false") return false;
        return rawValue;
      case "DateTime": {
        const dateValue = new Date(rawValue);
        return Number.isNaN(dateValue.getTime()) ? rawValue : dateValue;
      }
      default:
        return rawValue;
    }
  }

  private buildSearchFilter(key: string, value: string) {
    const field = this.modelFieldMap.get(key);

    // Skip unknown or non-scalar fields to avoid Prisma "unknown argument" errors.
    if (!field || (field.kind !== "scalar" && field.kind !== "enum"))
      return null;

    const isUuidField =
      field.kind === "scalar" &&
      field.type === "String" &&
      Array.isArray(field.nativeType) &&
      field.nativeType[0] === "Uuid";

    if (field.kind === "scalar" && field.type === "String" && !isUuidField) {
      return {
        [key]: {
          contains: value,
          mode: "insensitive",
        },
      };
    }

    return {
      [key]: {
        equals: this.normalizeSearchValue(value, field),
      },
    };
  }

  private getDefaultSearchOrderBy() {
    if (this.modelFieldMap.has("created_at"))
      return { created_at: "desc" as const };
    if (this.modelFieldMap.has("updated_at"))
      return { updated_at: "desc" as const };
    if (this.modelFieldMap.has("id")) return { id: "desc" as const };
    return undefined;
  }

  async search(req: Request) {
    try {
      const query = req.query;
      const filters: any[] = [];

      // Build filters dynamically from known scalar/enum model fields.
      for (const [key, value] of Object.entries(query)) {
        if (!value || typeof value !== "string") continue;

        const filter = this.buildSearchFilter(key, value);
        if (filter) filters.push(filter);
      }

      const queryOptions: any =
        filters.length > 0
          ? {
              where: {
                OR: filters,
              },
              orderBy: this.getDefaultSearchOrderBy(),
            }
          : {
              orderBy: this.getDefaultSearchOrderBy(),
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

  // getIds
  async getIds(id: string, signal?: AbortSignal) {
    const fields =
      this.modelName === "teacher"
        ? {
            teacher_registration_number: true,
            subject_specialization: true,
          }
        : this.modelName === "student"
          ? {
              student_registration_number: true,
            }
          : { first_name: true };
    try {
      // Get user detail
      const user = await this.model.findFirst({
        where: { better_auth_id: id },
        select: {
          id: true,
          ...fields,
        },
        signal,
      });

      if (!user) this.handleError("User not found.");

      // Get current branch
      const branch = await this.prisma.branch.findFirst({
        where: {
          isCurrent: true,
        },
        select: {
          id: true,
          name: true,
        },
      });

      // Get latest academic year
      const academic_year = branch
        ? await this.prisma.academicyear.findFirst({
            where: {
              branch_id: branch.id,
            },
            select: { id: true },
            take: 1,
            orderBy: { start_date: "desc" },
          })
        : null;

      const token = get_token();

      if (!token) {
        this.handleError("Error getting token.");
      }

      return {
        user,
        branch,
        academic_year,
        token,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(
        "%csrc/repositories/base.repositorie.ts:204 error",
        "color: #007acc;",
        error,
      );
      throw new Error(
        "An unexpected error occurred while doing operations with the database",
      );
    } else {
      console.log(
        "%csrc/repositories/base.repositorie.ts:209 error",
        "color: #007acc;",
        error,
      );
      if (typeof error === "string") {
        throw new Error(error);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}

export const handleError = (error: unknown): string => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return "An unexpected error occurred while doing operations with the database";
  }
  return "An unexpected error occurred";
};
