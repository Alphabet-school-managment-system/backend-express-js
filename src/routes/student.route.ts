import { StudentController } from "../controllers/student.controller.js";
import { studentSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new StudentController(), studentSchema).router;

export default router;
