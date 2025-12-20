import { Response } from "express";
import { auth_signup, get_random_password } from "../routes/auth.route.ts";
import { BaseRepository, prisma } from "./base.repositorie.ts";

export class staffRepo extends BaseRepository<"staff"> {
  constructor() {
    super("staff");
  }

  async create(data: any, res: Response, signal?: AbortSignal) {
    const { first_name, middle_name, email } = data;

    const password = get_random_password();

    return auth_signup({
      data: { name: `${first_name} ${middle_name}`, email, password },
      after_func: async ({ better_auth_id, tx }) => {
        await tx.staff.create({
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

  async delete(id: string, signal?: AbortSignal) {
    try {
      const staff = await this.model.findUnique({ where: { id }, signal });

      return await prisma.$transaction(async (tx) => {
        await tx.staff.delete({ where: { id } });
        await tx.user.delete({ where: { id: staff.better_auth_id } });
      });
    } catch (error) {
      this.handleError(error);
    }
  }
}
