import { leaveRequestRepo } from "../repositories/leave_request.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class LeaveRequestService extends BaseService<leaveRequestRepo> {
  constructor() {
    super(new leaveRequestRepo());
  }
}
