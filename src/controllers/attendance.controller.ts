import { AttendanceService } from "../services/attendance.service.ts";
import { attendanceSchema } from "../validators/zod.schema.ts";

import { BaseController } from "./base.controller.ts";

export class AttendanceController extends BaseController<AttendanceService> {
  constructor() {
    super(new AttendanceService(), attendanceSchema);
  }
}
