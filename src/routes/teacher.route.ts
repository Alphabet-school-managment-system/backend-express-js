import { TeacherController } from "../controllers/teacher.controller";
import { teacherSchema } from "../validators/zod.schema";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new TeacherController(), teacherSchema).router;

export default router;
