import { BranchController } from "../controllers/branch.controller";
import { branchSchema } from "../validators/branch.schema";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new BranchController(), branchSchema).router;

export default router;
