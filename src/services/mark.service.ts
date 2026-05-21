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

  async myAssessments(req: Request) {
    const {
      student_id,
      grade,
      section,
      subject,
      academic_year_id,
    } = req.query;

    return this.repository.myAssessments({
      student_id: student_id as string,
      grade: grade as string,
      section: section as string | undefined,
      subject: subject as string,
      academic_year_id: academic_year_id as string,
    });
  }
}
