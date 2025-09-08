import { StaffService } from "../services/staff.service";
import {
  staffSchema,
  StaffInput,
} from "../validators/zod.schema";
import { BaseController } from "./base.controller";

export class StaffController extends BaseController<
  StaffService,
  StaffInput
> {
  constructor() {
    super(new StaffService(), staffSchema);
  }
}
