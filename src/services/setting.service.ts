import { settingRepo } from "../repositories/setting.repositorie";
import { BaseService } from "./base.service";

export class SettingService extends BaseService<settingRepo> {
  constructor() {
    super(new settingRepo());
  }
}
