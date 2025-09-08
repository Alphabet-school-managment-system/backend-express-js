import { TermController } from "../controllers/term.controller";
import { termSchema } from "../validators/zod.schema";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new TermController(), termSchema).router;

export default router;
