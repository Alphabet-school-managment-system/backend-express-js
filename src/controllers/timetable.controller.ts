import { TimetableService } from "../services/timetable.service.js";
import { timetableSchema } from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class TimetableController extends BaseController<TimetableService> {
  constructor() {
    super(new TimetableService(), timetableSchema);
  }
}
