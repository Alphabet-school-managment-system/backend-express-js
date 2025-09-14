import { ClassSectionService } from "../services/class_section.service";
import { classSectionSchema } from "../validators/zod.schema";

import { BaseController } from "./base.controller";

export class ClassSectionController extends BaseController<ClassSectionService> {
  constructor() {
    super(new ClassSectionService(), classSectionSchema);
  }
}
