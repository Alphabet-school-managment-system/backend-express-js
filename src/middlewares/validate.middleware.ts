import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export function validate(schema?: ZodObject<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!schema) {
      next();
      return;
    }

    const data = {
      ...req.body,
      ...req.params,
      ...req.query,
      material_file: (req as any).file,
    };
    const result: any = schema?.safeParse(data);
    if (!result.success) {
      console.log(
        "%csrc/middlewares/validate.middleware.js:9 result.error",
        "color: #007acc;",
        result.error
      );
      return res.status(400).json({
        message: result.error.issues[0]?.message || "Validation error",
      });
    }
    next();
  };
}
