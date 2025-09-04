import { Router } from "express";
const router = Router();

// Example endpoints
router.get("/", (req, res) => res.send("Get all students"));
router.post("/", (req, res) => res.send("Create student"));

export default router;
