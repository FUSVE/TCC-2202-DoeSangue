import { Request, Response } from "express";
import { ListAchivementsByUserService } from "../../services/achivements/ListAchivementsByUserService";

class ListAchivementsByUserController {
  async handle(req: Request, res: Response) {
    const userId = req.query.userId as string;

    const listAchivementsByUserService = new ListAchivementsByUserService();

    const donation = await listAchivementsByUserService.execute({
      userId
    });

    return res.json(donation);
  }
}

export { ListAchivementsByUserController }