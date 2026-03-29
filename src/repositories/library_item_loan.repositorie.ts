import { Request } from "express";
import { BaseRepository } from "./base.repositorie.js";

export class libraryItemLoanRepo extends BaseRepository<"libraryitemloan"> {
  constructor() {
    super("libraryitemloan");
  }

  async findAll({
    where = {},
    orderBy,
    take,
    signal,
  }: {
    where?: any;
    orderBy?: any;
    take?: number;
    signal?: AbortSignal;
  }) {
    try {
      return await this.model.findMany(
        {
          where: {
            libraryitem: {
              ...where,
            },
          },
          include: {
            libraryitem: true,
            enrollment: true,
            teacher: true,
          },
          orderBy,
          take,
        },
        { signal },
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async search(req: Request) {
    try {
      const signal = (req as any).prismaSignal;
      const rawQueryOptions = (req.query as any).queryOptions;

      if (rawQueryOptions && typeof rawQueryOptions === "object") {
        return await this.model.findMany(
          {
            ...(rawQueryOptions ?? {}),
            include: {
              libraryitem: {
                select: {
                  id: true,
                  title: true,
                  author: true,
                  item_type: true,
                },
              },
            },
          },
          { signal },
        );
      }

      const query = req.query as Record<string, unknown>;
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
          .map((f) => f.trim())
          .filter(Boolean),
      );
      const orFields = new Set(
        rawOr
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      );

      const addFilter = (
        key: string,
        value: unknown,
        andFilters: any[],
        orFilters: any[],
        defaultFilters: any[],
      ) => {
        if (!value || typeof value !== "string") return;
        const filter = { [key]: value };
        if (andFields.has(key)) {
          andFilters.push(filter);
        } else if (orFields.has(key)) {
          orFilters.push(filter);
        } else {
          defaultFilters.push(filter);
        }
      };

      const andFilters: any[] = [];
      const orFilters: any[] = [];
      const defaultFilters: any[] = [];

      addFilter(
        "student_id",
        query.student_id,
        andFilters,
        orFilters,
        defaultFilters,
      );
      addFilter(
        "teacher_id",
        query.teacher_id,
        andFilters,
        orFilters,
        defaultFilters,
      );
      addFilter("status", query.status, andFilters, orFilters, defaultFilters);
      addFilter(
        "item_id",
        query.item_id,
        andFilters,
        orFilters,
        defaultFilters,
      );

      if (typeof query.branch_id === "string") {
        addFilter(
          "branchId",
          query.branch_id,
          andFilters,
          orFilters,
          defaultFilters,
        );
      }
      if (typeof query.branchId === "string") {
        addFilter(
          "branchId",
          query.branchId,
          andFilters,
          orFilters,
          defaultFilters,
        );
      }

      const combinedOrFilters = [...orFilters, ...defaultFilters];

      let where: any = undefined;
      if (andFilters.length > 0 && combinedOrFilters.length > 0) {
        where = { AND: [...andFilters, { OR: combinedOrFilters }] };
      } else if (andFilters.length > 0) {
        where = { AND: andFilters };
      } else if (combinedOrFilters.length > 0) {
        where = { OR: combinedOrFilters };
      }

      return await this.model.findMany(
        {
          ...(where ? { where } : {}),
          include: {
            libraryitem: {
              select: {
                id: true,
                title: true,
                author: true,
                item_type: true,
              },
            },
            enrollment: true,
            teacher: true,
          },
          orderBy: { issue_date: "desc" },
        },
        { signal },
      );
    } catch (error) {
      this.handleError(error);
    }
  }
}
