import { StudentController } from "../controllers/student.controller.ts";
import { studentSchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new StudentController(), studentSchema).router;

export default router;
