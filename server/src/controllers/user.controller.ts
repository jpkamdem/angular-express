import { Request, Response } from "express";
import { extractErrorMessage } from "../utils/errors";
import { fetchUsers } from "../utils/datas";

class UserController {
  async getUsers(res: Response) {
    try {
      const users = (await fetchUsers()).datas;
      if (!users) {
        return res.status(504).json({
          message: "Erreur interne lors de la récupération des données",
        });
      }

      return res.status(200).json(users);
    } catch (error: unknown) {
      return res.status(404).json({ message: extractErrorMessage(error) });
    }
  }

  async getUserById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(404).json({ message: "Erreur ID" });
    }

    const users = (await fetchUsers()).datas;
    if (!users) {
      return res.status(504).json({
        message: "Erreur interne lors de la récupération des données",
      });
    }

    const user = users.find((user) => user.id === id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `Utilisateur N°${id} introuvable` });
    }

    return res.status(200).json({ user });
  }
}

export const userController = new UserController();
