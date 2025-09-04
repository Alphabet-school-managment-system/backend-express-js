import { Router } from "express";
const router = Router();

// Example endpoints
router.get("/", (req, res) => res.send("Get all ays"));
router.post("/", (req, res) => res.send("Create ay"));

export default router;
