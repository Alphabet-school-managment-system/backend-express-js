import { DashboardController } from "../controllers/dashboard.controller.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new DashboardController(), undefined).router;

export default router;
