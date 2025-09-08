import { MarkController } from "../controllers/mark.controller";
import { markSchema } from "../validators/zod.schema";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new MarkController(), markSchema).router;

export default router;
