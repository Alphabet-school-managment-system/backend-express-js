import express from "express";
import { signupSchema } from "../validators/zod.schema.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { handleError, prisma } from "../repositories/base.repositorie.ts";
import { auth } from "../lib/auth.ts";

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

      const staff = await tx.staff.create({
        data: {
          better_auth_id: response?.user?.id,
          role: "Admin",
          first_name,
          last_name,
          email,
        },
        // signal?: AbortSignal
      });

      await tx.school.create({
        data: {
          name: school_name,
          staff_id: staff.id,
        },
      });

      return response;
    });

    res
      .status(201)
      .json({
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

export default router;
