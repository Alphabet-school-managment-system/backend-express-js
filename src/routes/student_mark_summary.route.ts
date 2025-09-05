import { Router } from "express";
const router = Router();

// Example endpoints
router.get("/", (req, res) => res.send("Get all student mark summarys"));
router.post("/", (req, res) => res.send("Create student mark summary"));

export default router;
