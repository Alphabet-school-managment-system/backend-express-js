import { Router } from "express";
const router = Router();

// Example endpoints
router.get("/", (req, res) => res.send("Get all library transactions"));
router.post("/", (req, res) => res.send("Create library transaction"));

export default router;
