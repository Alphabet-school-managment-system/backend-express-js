import { Request, Response } from "express";
import { LibraryItemService } from "../services/library_item.service.js";
import {
  libraryItemSchema,
  LibraryItemInput,
} from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class LibraryItemController extends BaseController<
  LibraryItemService,
  LibraryItemInput
> {
  constructor() {
    super(new LibraryItemService(), libraryItemSchema);
  }

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const itemId = req.params.id ?? (req.query.item_id as string | undefined);
      const userId = req.query.user_id as string | undefined;
      const signal = (req as any).prismaSignal as AbortSignal | undefined;

      if (!itemId) {
        res.status(400).json({ error: "item_id is required" });
        return;
      }

      const result = await this.service.findById(itemId, userId, signal);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
