import { BaseRouter } from "./base.router";
import { ClassSectionController } from "../controllers/class_section.controller";
import { classSectionSchema } from "../validators/zod.schema";

const router = new BaseRouter(new ClassSectionController(), classSectionSchema)
  .router;

export default router;
