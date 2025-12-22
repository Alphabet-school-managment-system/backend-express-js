import { behaviorSchema } from "../validators/zod.schema.js";
import { BehaviorController } from "../controllers/behavior.controller.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new BehaviorController(), behaviorSchema).router;

export default router;
