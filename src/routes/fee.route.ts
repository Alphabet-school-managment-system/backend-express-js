import { FeeController } from "../controllers/fee.controller.js";
import { feeSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new FeeController(), feeSchema).router;

export default router;
