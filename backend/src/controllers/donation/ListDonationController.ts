import { Request, Response } from "express";
import { ListDonationService } from "../../services/donation/ListDonationService";

class ListDonationController {
  async handle(req: Request, res: Response) {
    const listDonationService = new ListDonationService();

    const donation = await listDonationService.execute();

    return res.json(donation);
  }
}

export { ListDonationController }