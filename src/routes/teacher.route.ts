import { TeacherController } from "../controllers/teacher.controller.js";
import { teacherSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import z from "zod";

const controller = new TeacherController();
const router = new BaseRouter(controller, teacherSchema).router;

export const myAssignedGradeSchema = z.object({
  teacher_id: z
    .uuid({ message: "Invalid UUID format" })
    .or(z.string().min(32, "id must be at least 32 characters")),
  academic_year_id: z
    .uuid({ message: "Invalid UUID format" })
    .or(z.string().min(32, "id must be at least 32 characters")),
});

router.get(
  "/my-assigned-grade/:teacher_id/:academic_year_id",
  validate(myAssignedGradeSchema),
  authenticateToken,
  controller.getMyAssignedGrade.bind(controller),
);

export default router;
