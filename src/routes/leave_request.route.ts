import { LeaveRequestController } from "../controllers/leave_request.controller";
import { leaveRequestSchema } from "../validators/zod.schema";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new LeaveRequestController(), leaveRequestSchema).router;

export default router;
