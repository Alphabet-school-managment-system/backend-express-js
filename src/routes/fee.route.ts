import { Router } from "express";
const router = Router();

// Example endpoints
router.get("/", (req, res) => res.send("Get all fees"));
router.post("/", (req, res) => res.send("Create fee"));

export default router;
