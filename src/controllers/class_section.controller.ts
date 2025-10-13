import { ClassSectionService } from "../services/class_section.service.ts";
import { classSectionSchema } from "../validators/zod.schema.ts";

import { BaseController } from "./base.controller.ts";

export class ClassSectionController extends BaseController<ClassSectionService> {
  constructor() {
    super(new ClassSectionService(), classSectionSchema);
  }
}
