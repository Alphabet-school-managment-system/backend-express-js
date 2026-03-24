import { MarkController } from "../controllers/mark.controller.js";
import { markSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";

const controller = new MarkController();
const router = new BaseRouter(controller, markSchema).router;

export default router;
