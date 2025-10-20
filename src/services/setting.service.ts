import { settingRepo } from "../repositories/setting.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class SettingService extends BaseService<settingRepo> {
  constructor() {
    super(new settingRepo());
  }
}
