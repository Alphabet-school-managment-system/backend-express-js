import { LeaveRequestController } from "../controllers/leave_request.controller.js";
import { leaveRequestSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new LeaveRequestController(), leaveRequestSchema).router;

export default router;
