import { Router } from "express";
const router = Router();

// Example endpoints
router.get("/", (req, res) => res.send("Get all leave requests"));
router.post("/", (req, res) => res.send("Create leave request"));

export default router;
