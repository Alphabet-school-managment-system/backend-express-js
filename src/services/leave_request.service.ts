import { leaveRequestRepo } from "../repositories/leave_request.repositorie.js";
import { BaseService } from "./base.service.js";

export class LeaveRequestService extends BaseService<leaveRequestRepo> {
  constructor() {
    super(new leaveRequestRepo());
  }
}
