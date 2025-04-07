import { Request, Response, Router } from "express";
import { userController } from "../controllers/user.controller";

export const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
  await userController.getUsers(res);
});
userRouter.get("/:id", async (req: Request, res: Response) => {
  await userController.getUserById(req, res);
});
