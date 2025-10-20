import { BranchService } from "../services/branch.service.ts";
import { branchSchema } from "../validators/zod.schema.ts";

import { BaseController } from "./base.controller.ts";

export class BranchController extends BaseController<BranchService> {
  constructor() {
    super(new BranchService(), branchSchema);
  }
}
