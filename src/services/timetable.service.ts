import { timetableRepo } from "../repositories/timetable.repositorie.js";
import { BaseService } from "./base.service.js";

export class TimetableService extends BaseService<timetableRepo> {
  constructor() {
    super(new timetableRepo());
  }
}
