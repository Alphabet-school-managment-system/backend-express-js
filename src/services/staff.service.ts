import { staffRepo } from "../repositories/staff.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class StaffService extends BaseService<staffRepo> {
  constructor() {
    super(new staffRepo());
  }
}
