import { TimetableController } from "../controllers/timetable.controller.js";
import { timetableSchema } from "../validators/zod.schema.js";
import { BaseRouter } from "./base.router.js";

const router = new BaseRouter(new TimetableController(), timetableSchema)
  .router;

export default router;
