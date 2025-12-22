import { DashboardRepository } from "../repositories/dashboard.repositorie.js";

import { BaseService } from "./base.service.js";

export class DashboardService extends BaseService<DashboardRepository> {
  constructor() {
    super(new DashboardRepository());
  }
}
