import { StaffService } from "../services/staff.service.js";
import {
  staffSchema,
  StaffInput,
} from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class StaffController extends BaseController<
  StaffService,
  StaffInput
> {
  constructor() {
    super(new StaffService(), staffSchema);
  }
}
