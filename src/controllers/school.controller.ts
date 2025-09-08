import { SchoolService } from "../services/school.service";
import {
  schoolSchema,
  SchoolInput,
} from "../validators/zod.schema";
import { BaseController } from "./base.controller";

export class SchoolController extends BaseController<
  SchoolService,
  SchoolInput
> {
  constructor() {
    super(new SchoolService(), schoolSchema);
  }
}
