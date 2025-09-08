import { StaffController } from "../controllers/staff.controller";
import { staffSchema } from "../validators/zod.schema";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new StaffController(), staffSchema).router;

export default router;
