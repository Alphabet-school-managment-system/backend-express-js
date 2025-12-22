import { AcademicYearController } from "../controllers/academic_year.controller.js";
import { academicYearSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new AcademicYearController(), academicYearSchema)
  .router;

export default router;
