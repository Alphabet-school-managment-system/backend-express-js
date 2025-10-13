import { ParentStudentController } from "../controllers/parent_student.controller.ts";
import { parentStudentSchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new ParentStudentController(), parentStudentSchema).router;

export default router;
