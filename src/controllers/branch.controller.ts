import { BranchService } from "../services/branch.service";
import { branchSchema } from "../validators/zod.schema";

import { BaseController } from "./base.controller";

export class BranchController extends BaseController<BranchService> {
  constructor() {
    super(new BranchService(), branchSchema);
  }
}
