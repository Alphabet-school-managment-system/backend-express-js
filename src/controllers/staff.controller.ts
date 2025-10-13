import { StaffService } from "../services/staff.service.ts";
import {
  staffSchema,
  StaffInput,
} from "../validators/zod.schema.ts";
import { BaseController } from "./base.controller.ts";

export class StaffController extends BaseController<
  StaffService,
  StaffInput
> {
  constructor() {
    super(new StaffService(), staffSchema);
  }
}
