import { SettingController } from "../controllers/setting.controller.js";
import { settingSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new SettingController(), settingSchema).router;

export default router;
