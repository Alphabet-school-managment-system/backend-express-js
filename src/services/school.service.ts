import { schoolRepo } from "../repositories/school.repositorie.js";
import { BaseService } from "./base.service.js";

export class SchoolService extends BaseService<schoolRepo> {
  constructor() {
    super(new schoolRepo());
  }
}
