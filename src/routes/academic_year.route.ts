import { AcademicYearController } from "../controllers/academic_year.controller.ts";
import { academicYearSchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new AcademicYearController(), academicYearSchema)
  .router;

export default router;
