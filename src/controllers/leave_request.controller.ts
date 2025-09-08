import { LeaveRequestService } from "../services/leave_request.service";
import {
  leaveRequestSchema,
  LeaveRequestInput,
} from "../validators/zod.schema";
import { BaseController } from "./base.controller";

export class LeaveRequestController extends BaseController<
  LeaveRequestService,
  LeaveRequestInput
> {
  constructor() {
    super(new LeaveRequestService(), leaveRequestSchema);
  }
}
