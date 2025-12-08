import { Request, Response } from "express";
import { BranchService } from "../services/branch.service.ts";
import { branchSchema } from "../validators/zod.schema.ts";

import { BaseController } from "./base.controller.ts";

export class BranchController extends BaseController<BranchService> {
  constructor() {
    super(new BranchService(), branchSchema);
  }

  async changeCurrent(req: Request, res: Response) {
    try {
      const result = await this.service.changeCurrent(req.body);
      return res.json({ message: null, data: result });
      
    } catch (err: any) {
      return res
        .status(400)
        .json({ error: err?.message || "Failed to change current branch" });
    }
  }
}
