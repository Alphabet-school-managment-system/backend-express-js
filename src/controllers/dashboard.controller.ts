import { DashboardService } from "../services/dashboard.service.ts";

import { BaseController } from "./base.controller.ts";

export class DashboardController extends BaseController<DashboardService> {
  constructor() {
    super(new DashboardService(), undefined);
  }
}
