import { AttendanceRepository } from "../repositories/attendance.repositorie.js";
import { BaseService } from "./base.service.js";

export class AttendanceService extends BaseService<AttendanceRepository> {
  constructor() {
    super(new AttendanceRepository());
  }
}
