import { Router } from "express";
const router = Router();

// Example endpoints
router.get("/", (req, res) => res.send("Get all staffs"));
router.post("/", (req, res) => res.send("Create staff"));

export default router;
