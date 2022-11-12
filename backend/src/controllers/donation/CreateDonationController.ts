import { Request, Response } from "express";
import { CreateDonationService } from "../../services/donation/CreateDonationService";

class CreateDonationController {
  async handle(req: Request, res: Response) {

    const { quantity, userId } = req.body;

    const createDonationService = new CreateDonationService();

    const donation = await createDonationService.execute({
      quantity,
      userId,
    });

    return res.json(donation);
  }
}

export { CreateDonationController }