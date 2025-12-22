import { SettingService } from "../services/setting.service.js";
import {
  settingSchema,
  SettingInput,
} from "../validators/zod.schema.js";
import { BaseController } from "./base.controller.js";

export class SettingController extends BaseController<
  SettingService,
  SettingInput
> {
  constructor() {
    super(new SettingService(), settingSchema);
  }
}
