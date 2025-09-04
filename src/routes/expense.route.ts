import { Router } from "express";
const router = Router();

// Example endpoints
router.get("/", (req, res) => res.send("Get all expenses"));
router.post("/", (req, res) => res.send("Create expense"));

export default router;
