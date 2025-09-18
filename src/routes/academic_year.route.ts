import { AcademicYearController } from "../controllers/academic_year.controller";
import { academicYearSchema } from "../validators/zod.schema";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new AcademicYearController(), academicYearSchema)
  .router;

export default router;
