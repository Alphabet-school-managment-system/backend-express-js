import { Router } from "express";
import { BranchController } from "../controllers/branch.controller";
import { branchSchema } from "../validators/branch.schema";
import { validate } from "../middlewares/validate.middleware";
const router = Router();

const controller = new BranchController();

router.post("/", validate(branchSchema), controller.create.bind(controller));
router.get("/", controller.findAll.bind(controller));
router.get("/:id", controller.findOne.bind(controller));
router.put(
  "/:id/update",
  validate(branchSchema),
  controller.update.bind(controller)
);
router.delete("/:id/delete", controller.delete.bind(controller));

export default router;
