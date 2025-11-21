import { DashboardController } from "../controllers/dashboard.controller.ts";
import { BaseRouter } from "./base.router.ts";

const router = new BaseRouter(new DashboardController(), undefined).router;

export default router;
