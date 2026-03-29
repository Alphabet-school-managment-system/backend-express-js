import { Response } from "express";
import { Prisma } from "@prisma/client";
import { BaseRepository } from "./base.repositorie.js";

export class libraryItemRepo extends BaseRepository<"libraryitem"> {
  constructor() {
    super("libraryitem");
  }

  private add_prefix_zeros = (value: number) => String(value).padStart(6, "0");

  async create(data: any, res: Response, signal?: AbortSignal) {
    try {
      const last_record = await this.model.findFirst({
        orderBy: { registration_number: "desc" },
      });

      const last_registration_number = last_record
        ? Number(last_record.registration_number)
        : 0;

      const datas: any[] = [];

      if (typeof data.copies_available !== "number") {
        throw new Error("copies_available must be a number");
      }

      if (data.copies_available > 1) {
        const parentNumber = last_registration_number + 1;

        const parent = await this.model.create(
          {
            data: {
              ...data,
              registration_number: this.add_prefix_zeros(parentNumber),
            },
          },
          signal,
        );

        for (let i = 1; i < data.copies_available; i++) {
          datas.push({
            ...data,
            parent_id: parent.id,
            registration_number: this.add_prefix_zeros(parentNumber + i),
          });
        }
      } else {
        datas.push({
          ...data,
          registration_number: this.add_prefix_zeros(
            last_registration_number + 1,
          ),
        });
      }

      return await this.model.createMany(
        {
          data: datas,
        },
        signal,
      );
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
    const { where = {}, take, signal } = options;

    try {
      const parents = await this.model.findMany(
        {
          where: {
            ...where,
            parent_id: null,
          },
          orderBy: { registration_number: "desc" },
          take,
          include: {
            children: {
              orderBy: { registration_number: "asc" },
              select: { registration_number: true, id: true },
            },
          },
        },
        { signal },
      );

      const mappedParents = parents.map((p: any) => {
        const from = `# ${p.registration_number}`;
        const to =
          p.children.length > 0
            ? p.children[p.children.length - 1].registration_number
            : p.registration_number;

        if (p.children.length === 0) {
          delete p.children;
          p.isParent = false;
          p.registration_number = `# ${p.registration_number}`;
        } else {
          p.isParent = true;
          p.sub = p.children.map((child: any) => ({
            ...child,
            registration_number: `# ${child.registration_number}`,
            allowDelete: true,
            allowEdit: false,
            allowViewDetail: false,
          }));
          delete p.children;
        }

        return {
          ...p,
          from,
          to,
        };
      });
      return mappedParents;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findById(itemId: string, signal?: AbortSignal): Promise<any>;
  async findById(
    itemId: string,
    userId?: string,
    signal?: AbortSignal,
  ): Promise<any>;
  async findById(
    itemId: string,
    arg2?: string | AbortSignal,
    _signal?: AbortSignal,
  ) {
    const userId = typeof arg2 === "string" ? arg2 : undefined;
    try {
      if (!userId) {
        const rows = await this.prisma.$queryRaw<any[]>(
          Prisma.sql`
            SELECT li.*, li."_id" AS id, NULL::jsonb AS loan
            FROM "libraryitem" li
            WHERE li."_id" = CAST(${itemId} AS uuid)
          `,
        );

        return rows[0] ?? null;
      }

      const rows = await this.prisma.$queryRaw<any[]>(
        Prisma.sql`
          SELECT li.*, li."_id" AS id, to_jsonb(l) AS loan
          FROM "libraryitem" li
          LEFT JOIN LATERAL (
            SELECT l.*
            FROM "libraryitemloan" l
            WHERE l."item_id" = li."_id"
              AND l."status" IN ('BORROWED','RESERVED')
              AND (
                l."student_id" = CAST(${userId} AS uuid)
                OR l."teacher_id" = CAST(${userId} AS uuid)
              )
            ORDER BY l."issue_date" DESC
            LIMIT 1
          ) l ON true
          WHERE li."_id" = CAST(${itemId} AS uuid)
        `,
      );

      return rows[0] ?? null;
    } catch (error) {
      this.handleError(error);
    }
  }
}
