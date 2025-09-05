import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { behaviorSchema } from "../validators/behavior.schema";
import { BehaviorController } from "../controllers/behavior.controller";
const router = Router();

const controller = new BehaviorController();

router.post("/", validate(behaviorSchema), controller.create.bind(controller));
router.get("/", controller.findAll.bind(controller));
router.get("/:id", controller.findOne.bind(controller));
router.put(
  "/:id/update",
  validate(behaviorSchema),
  controller.update.bind(controller)
);
router.delete("/:id/delete", controller.delete.bind(controller));

export default router;
