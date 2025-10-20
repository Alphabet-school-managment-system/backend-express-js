import { SettingService } from "../services/setting.service.ts";
import {
  settingSchema,
  SettingInput,
} from "../validators/zod.schema.ts";
import { BaseController } from "./base.controller.ts";

export class SettingController extends BaseController<
  SettingService,
  SettingInput
> {
  constructor() {
    super(new SettingService(), settingSchema);
  }
}
