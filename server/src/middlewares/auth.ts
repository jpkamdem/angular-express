import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { APP_SECRET } from "../utils/secret";

type DecodedToken = {
  username: string;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies["token"];
    if (!token) {
      return res.status(404).json({ message: "Token manquant ou invalide" });
    }

    jwt.verify(token, APP_SECRET, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: "Token invalide" });
      }

      req.user = decoded as DecodedToken;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de l'authentification" });
  }
}
