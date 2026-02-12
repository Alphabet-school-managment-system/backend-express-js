import express, { Response } from "express";
import { signupSchema } from "../validators/zod.schema.js";
import { validate } from "../middlewares/validate.middleware.js";
import { handleError, prisma } from "../repositories/base.repositorie.js";
import { auth_client } from "../lib/auth.js";
import z from "zod";
import crypto from "crypto";

const router = express.Router();

export const get_random_password = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars[crypto.randomInt(0, chars.length)];
  }

  return password;
};

export const auth_signup = async ({
  data,
  after_func,
  success_message = "Account created successfully. Please check your email to verify your account.",
  res,
  includePasswordInEmailTemplate = false,
}: {
  data: {
    email: string;
    password: string;
    name: string;
  };
  after_func: ({
    better_auth_id,
    tx,
  }: {
    better_auth_id: string;
    tx: any;
  }) => Promise<void>;
  success_message?: string;
  res: Response;
  includePasswordInEmailTemplate?: boolean;
}) => {
  let Better_auth_response: any = null;

  try {
    const result = await prisma.$transaction(
      async (tx) => {
        const { response } = await auth_client({
          password: includePasswordInEmailTemplate ? data?.password : undefined,
        }).auth.api.signUpEmail({
          returnHeaders: true,
          body: data,
        });

        Better_auth_response = response;

        await after_func({
          better_auth_id: response?.user?.id,
          tx,
        });

        return response;
      },
      { timeout: 15000 },
    );

    res.status(201).json({
      message: success_message,
      data: result,
    });
  } catch (err: any) {
    if (Better_auth_response?.user?.token) {
      auth_delete_user({
        token: Better_auth_response?.token,
        res: res,
      });

      // for none BA error
      res.status(400).json({ error: handleError(err) });
    }
    res.status(400).json({ error: err.message });
  }
};

export const auth_delete_user = async ({
  token,
  res,
}: {
  token: string;
  res: Response;
}) => {
  try {
    await auth_client({}).auth.api.deleteUser({
      body: {
        token: token,
      },
    });
  } catch (rollbackError: any) {
    return res.status(400).json({ error: handleError(rollbackError) });
  }
};

router.post("/signup", validate(signupSchema), async (req, res) => {
  const { first_name } = req.body;

  auth_signup({
    data: { ...req.body, name: `${first_name}` },
    after_func: async ({ better_auth_id, tx }) => {
      const school = await tx.school.create({
        data: {
          name: req.body?.school_name,
          better_auth_id,
        },
      });

      await tx.branch.create({
        data: {
          name: "Main",
          school_id: school?.id,
          isCurrent: true,
          isDefault: true,
        },
      });
    },
    res: res,
  });
});

router.get(
  "/getIds/:id",
  validate(
    z.object({
      id: z.string(),
    }),
  ),
  async (req, res) => {
    try {
      const { id } = req.params;
      const school = await prisma.school.findFirst({
        where: {
          better_auth_id: id,
        },
        select: {
          id: true,
          branch: {
            where: {
              isCurrent: true,
              school: {
                better_auth_id: id,
              },
            },
            take: 1,
            select: {
              id: true,
              academicyear: {
                where: {
                  branch: {
                    isCurrent: true,
                  },
                },
                select: {
                  id: true,
                },
              },
              name: true,
            },
          },
        },
      });

      if (!school || school.branch.length === 0) {
        return res.status(404).json({ error: "Matching data not found" });
      }

      res.json({
        schoolId: school.id,
        branchId: school.branch[0].id,
        branchName: school.branch[0].name,
        academicYearId: school.branch[0].academicyear.map((a) => a.id),
      });
    } catch (err: any) {
      res.status(400).json({ error: handleError(err) || err.message });
    }
  },
);

export default router;
