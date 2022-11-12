import { Request, Response } from "express";
import { ListAchivementsService } from "../../services/achivements/ListAchivementsService";

class ListAchivementsController {
  async handle(req: Request, res: Response) {

    const userId = req.query.userId as string;

    const listAchivementsService = new ListAchivementsService();

    const achivements = await listAchivementsService.execute({ userId });

    return res.json(achivements);
  }
}

export { ListAchivementsController }