import { MarkController } from "../controllers/mark.controller.js";
import { markSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";

const controller = new MarkController();
const router = new BaseRouter(controller, markSchema, undefined, {
  registerCustomRoutes: (router, controller) => {
    router.get("/my-assessments", controller.myAssessments.bind(controller));
  },
}).router;

export default router;
