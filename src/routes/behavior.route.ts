import { behaviorSchema } from "../validators/zod.schema";
import { BehaviorController } from "../controllers/behavior.controller";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new BehaviorController(), behaviorSchema).router;

export default router;
