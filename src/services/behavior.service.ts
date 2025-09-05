import { BehaviorRepository } from "../repositories/behavior.repositorie";

const behaviorRepo = new BehaviorRepository();

export class BehaviorService {
  async createBehavior(data: any) {
    return behaviorRepo.create(data);
  }

  async getAllBehaviors() {
    return behaviorRepo.findAll();
  }

  async getBehaviorById(id: string) {
    return behaviorRepo.findById(id);
  }

  async updateBehavior(id: string, data: any) {
    return behaviorRepo.update(id, data);
  }

  async deleteBehavior(id: string) {
    return behaviorRepo.delete(id);
  }
}
