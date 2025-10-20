import { BranchController } from "../controllers/branch.controller.ts";
import { branchSchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new BranchController(), branchSchema).router;

export default router;
