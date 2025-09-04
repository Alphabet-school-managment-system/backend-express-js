import { Router } from "express";
const router = Router();

// Example endpoints
router.get("/", (req, res) => res.send("Get all parents"));
router.post("/", (req, res) => res.send("Create parent"));

export default router;
