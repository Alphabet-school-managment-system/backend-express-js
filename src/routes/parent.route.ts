import { ParentController } from "../controllers/parent.controller";
import { parentSchema } from "../validators/zod.schema";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new ParentController(), parentSchema).router;

export default router;
