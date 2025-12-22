import { SchoolService } from "../services/school.service.js";
import {
  schoolSchema,
  SchoolInput,
} from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class SchoolController extends BaseController<
  SchoolService,
  SchoolInput
> {
  constructor() {
    super(new SchoolService(), schoolSchema);
  }
}
