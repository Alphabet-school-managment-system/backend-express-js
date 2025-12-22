import { BranchController } from "../controllers/branch.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { branchSchema } from "../validators/zod.schema.js";
import { BaseRouter, idSchema } from "./base.router.js";

const branchController = new BranchController();

const router = new BaseRouter(branchController, branchSchema).router;

router.put(
  "/change-current",
  validate(idSchema),
  branchController.changeCurrent.bind(branchController)
);

export default router;
