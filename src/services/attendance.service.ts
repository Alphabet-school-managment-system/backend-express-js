import { AttendanceRepository } from "../repositories/attendance.repositorie";
import { BaseService } from "./base.service";

export class AttendanceService extends BaseService<AttendanceRepository> {
  constructor() {
    super(new AttendanceRepository());
  }
}
