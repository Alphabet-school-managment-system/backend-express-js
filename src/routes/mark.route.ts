import { Router } from "express";
const router = Router();

// Example endpoints
router.get("/", (req, res) => res.send("Get all marks"));
router.post("/", (req, res) => res.send("Create mark"));

export default router;
