import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { auth_signup, get_random_password } from "../routes/auth.route.js";
import prisma from "../configs/db.js";
import { get_token } from "../app.js";

export { prisma };

export class BaseRepository<
  TModel extends string,
  TCreate = any,
  TUpdate = any,
> {
  protected model: any;
  protected modelName: any;
  private modelFieldMap = new Map<string, any>();

  protected prisma = prisma;

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

  async patch(id: string, data: TUpdate, signal?: AbortSignal) {
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
    const betweenSuffix = "__between";
    const isBetween = key.endsWith(betweenSuffix);
    const fieldName = isBetween ? key.slice(0, -betweenSuffix.length) : key;
    const field = this.modelFieldMap.get(fieldName);

    // Skip unknown or non-scalar fields to avoid Prisma "unknown argument" errors.
    if (!field || (field.kind !== "scalar" && field.kind !== "enum"))
      return null;

    if (isBetween) {
      const [rawStart, rawEnd] = value
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);

      if (!rawStart || !rawEnd) return null;

      if (field.kind !== "scalar") return null;

      const startValue = this.normalizeSearchValue(rawStart, field);
      const endValue = this.normalizeSearchValue(rawEnd, field);

      return {
        [fieldName]: {
          gte: startValue,
          lte: endValue,
        },
      };
    }

    const isUuidField =
      field.kind === "scalar" &&
      field.type === "String" &&
      (field.name === "id" ||
        field.name.endsWith("_id") ||
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          value,
        ));

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
  protected preProcessSearchQuery(query: any) {
    const filters: any[] = [];

    const rawAnd =
      (typeof query.__and === "string" && query.__and) ||
      (typeof query.and === "string" && query.and) ||
      "";
    const rawOr =
      (typeof query.__or === "string" && query.__or) ||
      (typeof query.or === "string" && query.or) ||
      "";

    const andFields = new Set(
      rawAnd
        .split(",")
        .map((f: any) => f.trim())
        .filter(Boolean),
    );
    const orFields = new Set(
      rawOr
        .split(",")
        .map((f: any) => f.trim())
        .filter(Boolean),
    );

    const andFilters: any[] = [];
    const orFilters: any[] = [];

    // Build filters dynamically from known scalar/enum model fields.
    for (const [key, value] of Object.entries(query)) {
      if (!value || typeof value !== "string") continue;
      if (key === "__and" || key === "and" || key === "__or" || key === "or")
        continue;

      const filter = this.buildSearchFilter(key, value);
      if (filter) {
        if (andFields.has(key)) {
          andFilters.push(filter);
        } else if (orFields.has(key)) {
          orFilters.push(filter);
        } else {
          filters.push(filter);
        }
      }
    }

    const defaultOrFilters = filters;
    const combinedOrFilters = [...orFilters, ...defaultOrFilters];

    let where: any = undefined;
    if (andFilters.length > 0 && combinedOrFilters.length > 0) {
      where = {
        AND: [...andFilters, { OR: combinedOrFilters }],
      };
    } else if (andFilters.length > 0) {
      where = { AND: andFilters };
    } else if (combinedOrFilters.length > 0) {
      where = { OR: combinedOrFilters };
    }

    const queryOptions: any = {
      orderBy: this.getDefaultSearchOrderBy(),
      ...(where ? { where } : {}),
    };

    return queryOptions;
  }

  async search(req: Request) {
    try {
      const queryOptions: any = this.preProcessSearchQuery(req.query);

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
      data: {
        name: `${first_name} ${middle_name}`,
        email,
        password,
      },
      after_func: async ({ better_auth_id, tx }) => {
        const role =
          this.modelName === "staff" && data?.role ? data.role : this.modelName;

        await tx.user.update({
          where: { id: better_auth_id },
          data: {
            role,
          },
        });

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

  async search_people(req: Request) {
    try {
      const queryOptions: any = this.preProcessSearchQuery(req.query);

      // Only use signal if it exists
      const signal = (req as any).prismaSignal;

      return await this.model.findMany(
        {
          ...queryOptions,
          include: {
            user: {
              select: {
                banned: true,
                banReason: true,
                banExpires: true,
              },
            },
          },
        },
        { signal },
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll_people(options: {
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
          include: {
            user: {
              select: {
                banned: true,
                banReason: true,
                banExpires: true,
              },
            },
          },
        },
        { signal },
      );
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

      let enrollment = null;
      if (this.modelName === "student" && user) {
        enrollment = await this.prisma.enrollment.findFirst({
          where: { student_id: user?.id },
          select: {
            id: true,
            grade: true,
            section: true,
            stream: true,
          },
        });
      }

      // Get current branch
      const branch = await this.prisma.branch.findFirst({
        where: {
          isCurrent: true,
        },
        select: {
          id: true,
          name: true,
          school_id: true,
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
        enrollment,
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
    }
    console.log(
      "%csrc/repositories/base.repositorie.ts:209 error",
      "color: #007acc;",
      error,
    );
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    if (typeof error === "string") {
      throw new Error(error);
    }
    throw new Error("An unexpected error occurred");
  }
}

export const handleError = (error: unknown): string => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return "An unexpected error occurred while doing operations with the database";
  }
  return "An unexpected error occurred";
};
