import { behaviorSchema } from "../validators/zod.schema.ts";
import { BehaviorController } from "../controllers/behavior.controller.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new BehaviorController(), behaviorSchema).router;

export default router;
