import { staffRepo } from "../repositories/staff.repositorie.js";
import { BaseService } from "./base.service.js";

export class StaffService extends BaseService<staffRepo> {
  constructor() {
    super(new staffRepo());
  }
}
