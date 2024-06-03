import express, { Request, Response } from "express";
const router = express.Router()
import path from "path";

router.get('^/$|/index(.html)?', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

export default router;