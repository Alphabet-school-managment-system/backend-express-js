import { Router } from "express";
import { assessmentSchema } from "../validators/assessment.schema";
import { validate } from "../middlewares/validate.middleware";
import { AssessmentController } from "../controllers/assessment.controller";

const router = Router();

const controller = new AssessmentController();

router.post(
  "/",
  validate(assessmentSchema),
  controller.create.bind(controller)
);
router.get("/", controller.findAll.bind(controller));
router.get("/:id", controller.findOne.bind(controller));
router.put(
  "/:id/update",
  validate(assessmentSchema),
  controller.update.bind(controller)
);
router.delete("/:id/delete", controller.delete.bind(controller));

export default router;
