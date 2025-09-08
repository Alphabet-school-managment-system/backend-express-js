import { staffRepo } from "../repositories/staff.repositorie";
import { BaseService } from "./base.service";

export class StaffService extends BaseService<staffRepo> {
  constructor() {
    super(new staffRepo());
  }
}
