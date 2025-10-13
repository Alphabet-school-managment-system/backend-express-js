import { BaseRouter } from "./base.router.ts";
import { ClassSectionController } from "../controllers/class_section.controller.ts";
import { classSectionSchema } from "../validators/zod.schema.ts";

const router = new BaseRouter(new ClassSectionController(), classSectionSchema)
  .router;

export default router;
