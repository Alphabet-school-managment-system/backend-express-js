import { SettingController } from "../controllers/setting.controller.ts";
import { settingSchema } from "../validators/zod.schema.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new SettingController(), settingSchema).router;

export default router;
