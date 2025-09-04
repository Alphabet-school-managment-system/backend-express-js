import { Router } from "express";
const router = Router();

// Example endpoints
router.get("/", (req, res) => res.send("Get all classSections"));
router.post("/", (req, res) => res.send("Create classSection"));

export default router;
