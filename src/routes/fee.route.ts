import { FeeController } from "../controllers/fee.controller";
import { feeSchema } from "../validators/zod.schema";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new FeeController(), feeSchema).router;

export default router;
