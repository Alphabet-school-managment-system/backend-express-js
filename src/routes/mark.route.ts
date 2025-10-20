import { MarkController } from "../controllers/mark.controller.ts";
import { markSchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new MarkController(), markSchema).router;

export default router;
