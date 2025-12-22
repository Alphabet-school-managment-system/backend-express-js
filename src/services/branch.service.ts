import { BranchRepository } from "../repositories/branch.repositorie.js";

import { BaseService } from "./base.service.js";

export class BranchService extends BaseService<BranchRepository> {
  protected repo: BranchRepository;

  constructor() {
    const repo = new BranchRepository();
    super(repo);
    this.repo = repo;
  }

  async changeCurrent(payload: any) {
    return this.repo.changeCurrent(payload);
  }
}
