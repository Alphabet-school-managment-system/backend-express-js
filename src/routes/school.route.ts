import { SchoolController } from "../controllers/school.controller.ts";
import { schoolSchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new SchoolController(), schoolSchema).router;

export default router;
