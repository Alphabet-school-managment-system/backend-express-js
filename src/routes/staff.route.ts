import { StaffController } from "../controllers/staff.controller.ts";
import { staffSchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new StaffController(), staffSchema).router;

export default router;
