import { DashboardService } from "../services/dashboard.service.js";

import { BaseController } from "./base.controller.js";

export class DashboardController extends BaseController<DashboardService> {
  constructor() {
    super(new DashboardService(), undefined);
  }
}
