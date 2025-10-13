import { ParentController } from "../controllers/parent.controller.ts";
import { parentSchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new ParentController(), parentSchema).router;

export default router;
