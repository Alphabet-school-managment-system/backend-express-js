import { AttendanceService } from "../services/attendance.service";
import { attendanceSchema } from "../validators/zod.schema";

import { BaseController } from "./base.controller";

export class AttendanceController extends BaseController<AttendanceService> {
  constructor() {
    super(new AttendanceService(), attendanceSchema);
  }
}
