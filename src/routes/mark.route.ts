import { MarkController } from "../controllers/mark.controller.js";
import { markSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new MarkController(), markSchema).router;

export default router;
