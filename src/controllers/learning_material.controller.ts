import { LearningMaterialService } from "../services/learning_material.service.js";
import {
  learningMaterialSchema,
  LearningMaterialInput,
} from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class LearningMaterialController extends BaseController<
  LearningMaterialService,
  LearningMaterialInput
> {
  constructor() {
    super(new LearningMaterialService(), learningMaterialSchema);
  }
}
