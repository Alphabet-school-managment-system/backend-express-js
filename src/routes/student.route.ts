import { StudentController } from "../controllers/student.controller.js";
import { studentSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";
import z from "zod";

const studentFindOneIdSchema = z.object({
  id: z.union([
    z.uuid({ message: "Invalid UUID format" }),
    z
      .string()
      .regex(/^[A-Za-z0-9]{32}$/, "Invalid Better Auth id format"),
  ]),
});

const router = new BaseRouter(
  new StudentController(),
  studentSchema,
  studentFindOneIdSchema,
).router;

export default router;
