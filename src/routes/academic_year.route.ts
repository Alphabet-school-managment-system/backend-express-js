import { Router } from "express";
import { AcademicYearController } from "../controllers/academic_year.controller";
import { validate } from "../middlewares/validate.middleware";
import { academicYearSchema } from "../validators/academic_year.schema";
const router = Router();

const controller = new AcademicYearController();

router.post(
  "/",
  validate(academicYearSchema),
  controller.create.bind(controller)
);
router.get("/", controller.findAll.bind(controller));
router.get("/:id", controller.findOne.bind(controller));
router.put(
  "/:id/update",
  validate(academicYearSchema),
  controller.update.bind(controller)
);
router.delete("/:id/delete", controller.delete.bind(controller));

export default router;
