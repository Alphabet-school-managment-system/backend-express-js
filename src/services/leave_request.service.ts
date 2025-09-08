import { leaveRequestRepo } from "../repositories/leave_request.repositorie";
import { BaseService } from "./base.service";

export class LeaveRequestService extends BaseService<leaveRequestRepo> {
  constructor() {
    super(new leaveRequestRepo());
  }
}
