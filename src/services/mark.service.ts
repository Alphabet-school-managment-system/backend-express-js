import { Request } from "express";
import { markRepo } from "../repositories/mark.repositorie.js";
import { BaseService } from "./base.service.js";

export class MarkService extends BaseService<markRepo> {
  constructor() {
    super(new markRepo());
  }

  async findAll(req: Request) {
    const { assessment_id, grade, section } = req.query;

    return this.repository.findAll({
      where: {
        assessment_id: assessment_id as string | undefined,
        grade: grade as string | undefined,
        section: section as string | undefined,
      },
    });
  }
}
