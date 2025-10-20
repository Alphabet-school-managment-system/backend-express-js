import { TermController } from "../controllers/term.controller.ts";
import { termSchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new TermController(), termSchema).router;

export default router;
