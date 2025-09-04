import { Router } from "express";
const router = Router();

// Example endpoints
router.get("/", (req, res) => res.send("Get all assessments"));
router.post("/", (req, res) => res.send("Create assessment"));

export default router;
