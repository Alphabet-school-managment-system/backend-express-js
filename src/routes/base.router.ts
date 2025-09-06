import { Router, Request, Response } from "express";
import z, { ZodObject } from "zod";
import { validate } from "../middlewares/validate.middleware";

type CRUDController = {
  create: (req: Request, res: Response) => Promise<any>;
  findAll: (req: Request, res: Response) => Promise<any>;
  findOne: (req: Request, res: Response) => Promise<any>;
  update: (req: Request, res: Response) => Promise<any>;
  delete: (req: Request, res: Response) => Promise<any>;
};

export const idSchema = z.object({
  id: z
    .string()
    .uuid("Invalid UUID format")
    .min(32, "id must be at least 32 characters."),
});

export class BaseRouter<T extends CRUDController> {
  public router: Router;
  protected controller: T;

  constructor(controller: T, schema: ZodObject) {
    this.router = Router();
    this.controller = controller;
    this.initRoutes(schema);
  }

  protected initRoutes(schema: ZodObject) {
    this.router.post(
      "/",
      validate(schema),
      this.controller.create.bind(this.controller)
    );
    this.router.put(
      "/:id/update",
      validate(schema),
      this.controller.update.bind(this.controller)
    );
    this.router.get("/", this.controller.findAll.bind(this.controller));
    this.router.get(
      "/:id",
      validate(idSchema),
      this.controller.findOne.bind(this.controller)
    );
    this.router.delete(
      "/:id/delete",
      validate(idSchema),
      this.controller.delete.bind(this.controller)
    );
  }
}
