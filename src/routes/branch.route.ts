import { Router } from "express";
const router = Router();

// Example endpoints
router.get("/", (req, res) => res.send("Get all branchs"));
router.post("/", (req, res) => res.send("Create branch"));

export default router;
