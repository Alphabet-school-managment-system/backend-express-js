import { ClassSectionRepository } from "../repositories/class_section.repositorie";

import { BaseService } from "./base.service";

export class ClassSectionService extends BaseService<ClassSectionRepository> {
  constructor() {
    super(new ClassSectionRepository());
  }
}
