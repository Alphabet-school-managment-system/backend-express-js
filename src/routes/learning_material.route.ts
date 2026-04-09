import { LearningMaterialController } from "../controllers/learning_material.controller.js";
import {
  learningMaterialSchema,
  learningMaterialUpdateSchema,
} from "../validators/zod.schema.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { learningMaterialUpload } from "../middlewares/upload.middleware.js";
import { BaseRouter } from "./base.router.js";

const controller = new LearningMaterialController();

const router = new BaseRouter(
  new LearningMaterialController(),
  learningMaterialSchema,
  undefined,
  {
    skipCreateRoute: true,
    skipUpdateRoute: true,
  },
).router;

router.post(
  "/",
  authenticateToken,
  learningMaterialUpload,
  validate(learningMaterialSchema),
  controller.create.bind(controller),
);
router.put(
  "/:id/update",
  authenticateToken,
  learningMaterialUpload,
  validate(learningMaterialUpdateSchema),
  controller.update.bind(controller),
);

export default router;
