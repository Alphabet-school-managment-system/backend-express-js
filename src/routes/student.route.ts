import { StudentController } from "../controllers/student.controller";
import { studentSchema } from "../validators/zod.schema";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new StudentController(), studentSchema).router;

export default router;
