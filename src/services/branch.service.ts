import { BranchRepository } from "../repositories/branch.repositorie.ts";

import { BaseService } from "./base.service.ts";

export class BranchService extends BaseService<BranchRepository> {
  constructor() {
    super(new BranchRepository());
  }
}
