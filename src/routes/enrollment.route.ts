import { BaseRouter } from "./base.router.ts";
import { EnrollmentController } from "../controllers/enrollment.controller.ts";
import { enrollmentSchema } from "../validators/zod.schema.ts";

const router = new BaseRouter(new EnrollmentController(), enrollmentSchema)
  .router;

export default router;
