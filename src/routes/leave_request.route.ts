import { LeaveRequestController } from "../controllers/leave_request.controller.ts";
import { leaveRequestSchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new LeaveRequestController(), leaveRequestSchema).router;

export default router;
