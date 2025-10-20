import { LeaveRequestService } from "../services/leave_request.service.ts";
import {
  leaveRequestSchema,
  LeaveRequestInput,
} from "../validators/zod.schema.ts";
import { BaseController } from "./base.controller.ts";

export class LeaveRequestController extends BaseController<
  LeaveRequestService,
  LeaveRequestInput
> {
  constructor() {
    super(new LeaveRequestService(), leaveRequestSchema);
  }
}
