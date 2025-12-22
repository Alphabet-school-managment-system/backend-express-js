import { AttendanceController } from "../controllers/attendance.controller.js";
import { attendanceSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new AttendanceController(), attendanceSchema)
  .router;
export default router;
