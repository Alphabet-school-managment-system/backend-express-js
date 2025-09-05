import { Router } from "express";
const router = Router();

// Example endpoints
router.get("/", (req, res) => res.send("Get all finance summarys"));
router.post("/", (req, res) => res.send("Create finance summary"));

export default router;
