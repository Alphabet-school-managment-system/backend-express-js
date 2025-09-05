import { Request, Response } from "express";
import { BranchService } from "../services/branch.service";
import { BranchInput, branchSchema } from "../validators/branch.schema";

const branchService = new BranchService();

export class BranchController {
  async create(req: Request, res: Response) {
    try {
      const data: BranchInput = branchSchema.parse(req.body);

      const branch = await branchService.createBranch(data);
      res.status(201).json(branch);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const branches = await branchService.getAllBranchs();
      res.json(branches);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const branch = await branchService.getBranchById(req.params.id);
      if (!branch) return res.status(404).json({ message: "Not found" });
      res.json(branch);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const data: BranchInput = branchSchema.parse(req.body);

      const updated = await branchService.updateBranch(req.params.id, data);
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await branchService.deleteBranch(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
