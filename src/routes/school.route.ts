import { Router } from "express";
const router = Router();

// Example endpoints
router.get("/", (req, res) => res.send("Get all schools"));
router.post("/", (req, res) => res.send("Create school"));

export default router;
