import { DashboardRepository } from "../repositories/dashboard.repositorie.ts";

import { BaseService } from "./base.service.ts";

export class DashboardService extends BaseService<DashboardRepository> {
  constructor() {
    super(new DashboardRepository());
  }
}
