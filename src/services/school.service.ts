import { schoolRepo } from "../repositories/school.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class SchoolService extends BaseService<schoolRepo> {
  constructor() {
    super(new schoolRepo());
  }
}
