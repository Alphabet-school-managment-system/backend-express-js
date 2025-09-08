import { SchoolController } from "../controllers/school.controller";
import { schoolSchema } from "../validators/zod.schema";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new SchoolController(), schoolSchema).router;

export default router;
