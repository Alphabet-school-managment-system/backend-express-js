import { SettingService } from "../services/setting.service";
import {
  settingSchema,
  SettingInput,
} from "../validators/zod.schema";
import { BaseController } from "./base.controller";

export class SettingController extends BaseController<
  SettingService,
  SettingInput
> {
  constructor() {
    super(new SettingService(), settingSchema);
  }
}
