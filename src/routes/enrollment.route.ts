import { BaseRouter } from "./base.router";
import { EnrollmentController } from "../controllers/enrollment.controller";
import { enrollmentSchema } from "../validators/zod.schema";

const router = new BaseRouter(new EnrollmentController(), enrollmentSchema)
  .router;

export default router;
