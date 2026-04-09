import { learningMaterialRepo } from "../repositories/learning_material.repositorie.js";
import { BaseService } from "./base.service.js";

export class LearningMaterialService extends BaseService<learningMaterialRepo> {
  constructor() {
    super(new learningMaterialRepo());
  }
}
