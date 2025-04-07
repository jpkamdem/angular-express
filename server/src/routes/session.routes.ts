import { Router, Request, Response } from "express";
import { sessionController } from "../controllers/session.controller";

export const sessionRouter = Router();

sessionRouter.post("/login", async (req: Request, res: Response) => {
  await sessionController.login(req, res);
});
sessionRouter.post("/signup", async (req: Request, res: Response) => {
  sessionController.signup(req, res);
});
sessionRouter.post("/logout", async (req: Request, res: Response) => {
  await sessionController.logout(res);
});
