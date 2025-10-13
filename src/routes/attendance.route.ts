import { AttendanceController } from "../controllers/attendance.controller.ts";
import { attendanceSchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new AttendanceController(), attendanceSchema)
  .router;
export default router;
