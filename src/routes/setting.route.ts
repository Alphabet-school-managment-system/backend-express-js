import { SettingController } from "../controllers/setting.controller";
import { settingSchema } from "../validators/zod.schema";
import { BaseRouter } from "./base.router";

const router = new BaseRouter(new SettingController(), settingSchema).router;

export default router;
