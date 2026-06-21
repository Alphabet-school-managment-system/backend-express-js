import { Request, Response } from "express";
import { ZodObject } from "zod";

type CRUDService = {
  create: (data: any, res: Response) => Promise<any>;
  findAll: (req: Request) => Promise<any>;
  findById: (id: string) => Promise<any>;
  update: (id: string, data: any) => Promise<any>;
  patch: (id: string, data: any) => Promise<any>;
  delete: (id: string) => Promise<void>;
  search: (req: Request) => Promise<any>;
  getIds: (id: string) => Promise<any>;
  bulkUpdate: (
    items: { ids: string[]; data: any },
    req?: Request,
  ) => Promise<any>;
};

export class BaseController<TService extends CRUDService, TInput = any> {
  protected service: TService;
  protected schema?: ZodObject<any>;
  protected partialSchema?: ZodObject<any>;

  constructor(
    service: TService,
    schema?: ZodObject<any>,
    partialSchema?: ZodObject<any>,
  ) {
    this.service = service;
    this.schema = schema;
    this.partialSchema = partialSchema;
  }

  async create(req: Request, res: Response) {
    try {
      const data: TInput = this.schema
        ? this.schema.parse({ ...req.body, material_file: (req as any).file })
        : { ...req.body, material_file: (req as any).file };
      const result = await this.service.create(data, res);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await this.service.findAll(req);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const result = await this.service.findById(req.params.id);
      // if (!result) return res.status(404).json({ message: "Not found" });
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const data: TInput = this.schema
        ? this.schema.parse({ ...req.body, material_file: (req as any).file })
        : { ...req.body, material_file: (req as any).file };
      const result = await this.service.update(req.params.id, data);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async patch(req: Request, res: Response) {
    try {
      const data = this.partialSchema
        ? this.partialSchema.parse({ ...req.body })
        : { ...req.body };
      const result = await this.service.patch(req.params.id, data);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const result = await this.service.delete(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const result = await this.service.search(req);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getIds(req: Request, res: Response) {
    try {
      const result = await this.service.getIds(req.params.id);
      // if (!result) return res.status(404).json({ message: "Not found" });
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async bulkUpdate(req: Request, res: Response) {
    try {
      const { ids, data } = req.body;

      let parsedIds: any = undefined;

      if (ids) {
        if (typeof ids === "string") {
          try {
            parsedIds = JSON.parse(ids as string);
          } catch (e) {
            return res
              .status(400)
              .json({ error: "Error happen when parsing the JSON string" });
          }
        } else {
          return res.status(400).json({ error: "Ids must be in JSON string" });
        }
      }

      if (!parsedIds) {
        return res
          .status(400)
          .json({ error: "Missing update data in query parameter 'data'" });
      }

      const result = await this.service.bulkUpdate(
        { ids: parsedIds, data: data },
        req,
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
