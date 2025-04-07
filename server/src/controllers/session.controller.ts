import { Request, Response } from "express";
import { fetchUsers } from "../utils/datas";
import { extractErrorMessage } from "../utils/errors";
import { APP_SECRET } from "../utils/secret";
import jwt from "jsonwebtoken";

class SessionController {
  async login(req: Request, res: Response) {
    try {
      const { email, username } = req.body;
      if (!email || !username) {
        return res
          .status(404)
          .json({ message: "Veuillez remplir tous les champs" });
      }

      const users = (await fetchUsers()).datas;
      if (!users) {
        return res.status(504).json({
          message: "Erreur interne lors de la récupération des données",
        });
      }

      const user = users.find(
        (user) => user.username === username && user.email === email
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: "Identifiants de connexion invalides." });
      }

      return res
        .cookie(
          "token",
          jwt.sign({ username: username, email: email }, APP_SECRET),
          {
            httpOnly: true,
            partitioned: true,
            maxAge: 60 * 60 * 1000,
            priority: "high",
          }
        )
        .status(200)
        .json({ message: `Utilisateur ${username} connecté, ${email}` });
    } catch (error: unknown) {
      return res.status(404).json({ message: extractErrorMessage(error) });
    }
  }

  async logout(res: Response) {
    try {
      return res
        .clearCookie("token")
        .status(204)
        .json({ message: "Déconnexion" });
    } catch (error) {
      return res.status(504).json({ message: "Erreur lors de la déconnexion" });
    }
  }

  async signup(req: Request, res: Response) {}
}
export const sessionController = new SessionController();
