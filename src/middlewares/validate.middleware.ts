import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export function validate(schema: ZodObject<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = { ...req.body, ...req.params, ...req.query };
    const result = schema.safeParse(data);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0]?.message || "Validation error",
      });
    }
    next();
  };
}
