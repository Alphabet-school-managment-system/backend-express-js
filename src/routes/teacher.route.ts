import { Router } from "express";
const router = Router();

// Example endpoints
router.get("/", (req, res) => res.send("Get all teachers"));
router.post("/", (req, res) => res.send("Create teacher"));

export default router;
