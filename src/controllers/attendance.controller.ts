import { AttendanceService } from "../services/attendance.service.js";
import { attendanceSchema } from "../validators/zod.schema.js";

import { BaseController } from "./base.controller.js";

export class AttendanceController extends BaseController<AttendanceService> {
  constructor() {
    super(new AttendanceService(), attendanceSchema);
  }
}
