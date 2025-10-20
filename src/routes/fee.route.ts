import { FeeController } from "../controllers/fee.controller.ts";
import { feeSchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new FeeController(), feeSchema).router;

export default router;
