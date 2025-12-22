import { ParentController } from "../controllers/parent.controller.js";
import { parentSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new ParentController(), parentSchema).router;

export default router;
