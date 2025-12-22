import { StaffController } from "../controllers/staff.controller.js";
import { staffSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new StaffController(), staffSchema).router;

export default router;
