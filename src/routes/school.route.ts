import { SchoolController } from "../controllers/school.controller.js";
import { schoolSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new SchoolController(), schoolSchema).router;

export default router;
