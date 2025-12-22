import { ParentStudentController } from "../controllers/parent_student.controller.js";
import { parentStudentSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new ParentStudentController(), parentStudentSchema).router;

export default router;
