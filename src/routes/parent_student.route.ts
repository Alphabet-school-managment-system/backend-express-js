import { ParentStudentController } from "../controllers/parent_student.controller";
import { parentStudentSchema } from "../validators/zod.schema";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new ParentStudentController(), parentStudentSchema).router;

export default router;
