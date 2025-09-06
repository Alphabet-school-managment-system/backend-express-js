import { AttendanceController } from "../controllers/attendance.controller";
import { attendanceSchema } from "../validators/attendance.schema";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new AttendanceController(), attendanceSchema)
  .router;
export default router;
