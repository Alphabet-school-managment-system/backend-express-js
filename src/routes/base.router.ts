import { Router, Request, Response } from "express";
import z, { ZodObject } from "zod";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
type CRUDController = {
  create: (req: Request, res: Response) => Promise<any>;
  findAll: (req: Request, res: Response) => Promise<any>;
  findOne: (req: Request, res: Response) => Promise<any>;
  update: (req: Request, res: Response) => Promise<any>;
  delete: (req: Request, res: Response) => Promise<any>;
  search: (req: Request, res: Response) => Promise<any>;
  getIds: (req: Request, res: Response) => Promise<any>;
};

export const idSchema = z.object({
  id: z
    .uuid({ message: "Invalid UUID format" })
    .or(z.string().min(32, "id must be at least 32 characters")),
});
const BetterAuthIdSchema = z.object({
  id: z.union([
    z.uuid({ message: "Invalid UUID format" }),
    z.string().regex(/^[A-Za-z0-9]{32}$/, "Invalid Better Auth id format"),
  ]),
});

export class BaseRouter<T extends CRUDController> {
  public router: Router;
  protected controller: T;

  constructor(controller: T, schema?: ZodObject) {
    this.router = Router();
    this.controller = controller;
    this.initRoutes(schema);
  }

  protected initRoutes(schema?: ZodObject) {
    this.router.post(
      "/",
      validate(schema),
      authenticateToken,
      this.controller.create.bind(this.controller),
    );
    this.router.put(
      "/:id/update",
      validate(schema),
      authenticateToken,
      this.controller.update.bind(this.controller),
    );
    this.router.get(
      "/",
      authenticateToken,
      this.controller.findAll.bind(this.controller),
    );
    this.router.get(
      "/search",
      authenticateToken,
      this.controller.search.bind(this.controller),
    );
    this.router.get(
      "/:id",
      validate(idSchema),
      authenticateToken,
      this.controller.findOne.bind(this.controller),
    );
    this.router.get(
      "/getIds/:id",
      validate(BetterAuthIdSchema),
      this.controller.getIds.bind(this.controller),
    );

    this.router.delete(
      "/:id/delete",
      validate(idSchema),
      authenticateToken,
      this.controller.delete.bind(this.controller),
    );
  }
}
