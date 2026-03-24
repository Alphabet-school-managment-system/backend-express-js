import { TeacherService } from "../services/teacher.service.js";
import { teacherSchema, TeacherInput } from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class TeacherController extends BaseController<
  TeacherService,
  TeacherInput
> {
  constructor() {
    super(new TeacherService(), teacherSchema);
  }

  async getMyAssignedGrade(req: any, res: any) {
    try {
      const result = await this.service.getMyAssignedGrade(req);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
