import { BranchRepository } from "../repositories/branch.repositorie";

const branchRepo = new BranchRepository();

export class BranchService {
  async createBranch(data: any) {
    return branchRepo.create(data);
  }

  async getAllBranchs() {
    return branchRepo.findAll();
  }

  async getBranchById(id: string) {
    return branchRepo.findById(id);
  }

  async updateBranch(id: string, data: any) {
    return branchRepo.update(id, data);
  }

  async deleteBranch(id: string) {
    return branchRepo.delete(id);
  }
}
