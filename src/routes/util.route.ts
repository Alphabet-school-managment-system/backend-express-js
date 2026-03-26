import dayjs from "dayjs";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/server-date", async (req: Request, res: Response) => {
  const serverDate = dayjs().format("YYYY-MM-DD");
  res.status(200).json(serverDate);
});

export default router;
