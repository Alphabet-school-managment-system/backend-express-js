import { schoolRepo } from "../repositories/school.repositorie";
import { BaseService } from "./base.service";

export class SchoolService extends BaseService<schoolRepo> {
  constructor() {
    super(new schoolRepo());
  }
}
