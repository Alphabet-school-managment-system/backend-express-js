import { Router } from "express";
const router = Router();

// Example endpoints
router.get("/", (req, res) => res.send("Get all enrollments"));
router.post("/", (req, res) => res.send("Create enrollment"));

export default router;
