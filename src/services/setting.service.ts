import { settingRepo } from "../repositories/setting.repositorie.js";
import { BaseService } from "./base.service.js";

export class SettingService extends BaseService<settingRepo> {
  constructor() {
    super(new settingRepo());
  }
}
