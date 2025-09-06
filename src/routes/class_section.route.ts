import { BaseRouter } from "./base.router";
import { ClassSectionController } from "../controllers/class_section.controller";
import { classSectionSchema } from "../validators/class_section.schema";

const router = new BaseRouter(new ClassSectionController(), classSectionSchema)
  .router;

export default router;
