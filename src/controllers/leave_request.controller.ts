import { LeaveRequestService } from "../services/leave_request.service.js";
import {
  leaveRequestSchema,
  LeaveRequestInput,
} from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class LeaveRequestController extends BaseController<
  LeaveRequestService,
  LeaveRequestInput
> {
  constructor() {
    super(new LeaveRequestService(), leaveRequestSchema);
  }
}
