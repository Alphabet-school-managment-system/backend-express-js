import { MarkService } from "../services/mark.service.js";
import { Request, Response } from "express";
import { markSchema, MarkInput } from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class MarkController extends BaseController<MarkService, MarkInput> {
  constructor() {
    super(new MarkService(), markSchema);
  }

  async myAssessments(req: Request, res: Response) {
    try {
      const result = await this.service.myAssessments(req);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
