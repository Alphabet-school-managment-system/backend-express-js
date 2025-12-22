import { TeacherController } from "../controllers/teacher.controller.js";
import { teacherSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new TeacherController(), teacherSchema).router;

export default router;
