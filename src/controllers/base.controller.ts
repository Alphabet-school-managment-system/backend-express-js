import { Request, Response } from "express";
import { ZodObject } from "zod";

type CRUDService = {
  create: (data: any) => Promise<any>;
  findAll: (req: Request) => Promise<any>;
  findById: (id: string) => Promise<any>;
  update: (id: string, data: any) => Promise<any>;
  delete: (id: string) => Promise<void>;
};

export class BaseController<TService extends CRUDService> {
  protected service: TService;
  protected schema?: ZodObject;

  constructor(service: TService, schema?: ZodObject) {
    this.service = service;
    this.schema = schema;
  }

  async create(req: Request, res: Response) {
    try {
      const data = this.schema ? this.schema.parse(req.body) : req.body;
      const result = await this.service.create(data);
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
      if (!result) return res.status(404).json({ message: "Not found" });
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const data = this.schema ? this.schema.parse(req.body) : req.body;
      const result = await this.service.update(req.params.id, data);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.service.delete(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
