import { BaseRouter } from "./base.router.js";
import { EnrollmentController } from "../controllers/enrollment.controller.js";
import { enrollmentSchema } from "../validators/zod.schema.js";

const router = new BaseRouter(new EnrollmentController(), enrollmentSchema)
  .router;

export default router;
