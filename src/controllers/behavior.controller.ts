import { Request, Response } from "express";
import { BehaviorService } from "../services/behavior.service";
import { BehaviorInput, behaviorSchema } from "../validators/behavior.schema";

const behaviorService = new BehaviorService();

export class BehaviorController {
  async create(req: Request, res: Response) {
    try {
      const data: BehaviorInput = behaviorSchema.parse(req.body);

      const behavior = await behaviorService.createBehavior(data);
      res.status(201).json(behavior);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const behaviors = await behaviorService.getAllBehaviors();
      res.json(behaviors);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const behavior = await behaviorService.getBehaviorById(req.params.id);
      if (!behavior) return res.status(404).json({ message: "Not found" });
      res.json(behavior);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const data: BehaviorInput = behaviorSchema.parse(req.body);

      const updated = await behaviorService.updateBehavior(req.params.id, data);
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await behaviorService.deleteBehavior(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
