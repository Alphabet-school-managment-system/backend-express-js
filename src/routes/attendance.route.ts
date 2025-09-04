import { Router } from "express";
const router = Router();

// Example endpoints
router.get("/", (req, res) => res.send("Get all attendances"));
router.post("/", (req, res) => res.send("Create attendance"));

export default router;
