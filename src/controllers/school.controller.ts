import { SchoolService } from "../services/school.service.ts";
import {
  schoolSchema,
  SchoolInput,
} from "../validators/zod.schema.ts";
import { BaseController } from "./base.controller.ts";

export class SchoolController extends BaseController<
  SchoolService,
  SchoolInput
> {
  constructor() {
    super(new SchoolService(), schoolSchema);
  }
}
