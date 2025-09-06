import { BranchRepository } from "../repositories/branch.repositorie";

import { BaseService } from "./base.service";

export class BranchService extends BaseService<BranchRepository> {
  constructor() {
    super(new BranchRepository());
  }
}
