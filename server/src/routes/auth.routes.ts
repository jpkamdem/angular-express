import { Router, Request, Response } from "express";
import { authController } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  await authController.login(req, res);
});
authRouter.post("/signup", async (req: Request, res: Response) => {
  authController.signup(req, res);
});
authRouter.post("/logout", async (req: Request, res: Response) => {
  await authController.logout(res);
});
