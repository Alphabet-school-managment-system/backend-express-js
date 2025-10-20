import { ClassSectionRepository } from "../repositories/class_section.repositorie.ts";

import { BaseService } from "./base.service.ts";

export class ClassSectionService extends BaseService<ClassSectionRepository> {
  constructor() {
    super(new ClassSectionRepository());
  }
}
