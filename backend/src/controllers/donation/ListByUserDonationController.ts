import { Request, Response } from "express";
import { ListByUserDonationService } from "../../services/donation/ListByUserDonationService";

class ListByUserDonationController {
  async handle(req: Request, res: Response) {
    const userId = req.query.userId as string;

    const listByUserDonationService = new ListByUserDonationService();

    const donation = await listByUserDonationService.execute({
      userId
    });

    return res.json(donation);
  }
}

export { ListByUserDonationController }