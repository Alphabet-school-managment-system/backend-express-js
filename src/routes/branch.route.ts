import { BranchController } from "../controllers/branch.controller.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { branchSchema } from "../validators/zod.schema.ts";
import { BaseRouter, idSchema } from "./base.router.ts";

const branchController = new BranchController();

const router = new BaseRouter(branchController, branchSchema).router;

router.put(
  "/change-current",
  validate(idSchema),
  branchController.changeCurrent.bind(branchController)
);

export default router;
