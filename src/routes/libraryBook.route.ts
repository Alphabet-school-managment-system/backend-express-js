import { Router } from "express";
const router = Router();

// Example endpoints
router.get("/", (req, res) => res.send("Get all library books"));
router.post("/", (req, res) => res.send("Create library book"));

export default router;
