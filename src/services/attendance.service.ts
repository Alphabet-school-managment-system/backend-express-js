import { AttendanceRepository } from "../repositories/attendance.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class AttendanceService extends BaseService<AttendanceRepository> {
  constructor() {
    super(new AttendanceRepository());
  }
}
