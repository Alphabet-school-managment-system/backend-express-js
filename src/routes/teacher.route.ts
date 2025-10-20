import { TeacherController } from "../controllers/teacher.controller.ts";
import { teacherSchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new TeacherController(), teacherSchema).router;

export default router;
