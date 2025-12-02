import express from "express";
import { signupSchema } from "../validators/zod.schema.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { handleError, prisma } from "../repositories/base.repositorie.ts";
import { auth } from "../lib/auth.ts";
import z from "zod";

const router = express.Router();

router.post("/signup", validate(signupSchema), async (req, res) => {
  const { email, password, first_name, last_name, school_name } = req.body;

  let Better_auth_response: any = null;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const { response } = await auth.api.signUpEmail({
        returnHeaders: true,
        body: {
          email,
          password,
          name: `${first_name}`,
        },
      });

      Better_auth_response = response;

      const school = await tx.school.create({
        data: {
          name: school_name,
          better_auth_id: response?.user?.id,
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

      return response;
    });

    res.status(201).json({
      message:
        "Account created successfully. Please check your email to verify your account.",
      data: result,
    });
  } catch (err: any) {
    if (Better_auth_response?.user?.token) {
      try {
        await auth.api.deleteUser({
          body: { token: Better_auth_response?.token },
        });
      } catch (rollbackError: any) {
        res.status(400).json({ error: err.message });
      }

      // for none BA error
      res.status(400).json({ error: handleError(err) });
    }

    res.status(400).json({ error: err.message });
  }
});

router.get(
  "/getIds/:id",
  validate(
    z.object({
      id: z.string(),
    })
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
  }
);

export default router;
