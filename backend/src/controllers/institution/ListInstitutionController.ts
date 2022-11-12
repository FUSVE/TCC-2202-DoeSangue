import { Request, Response } from "express";
import { ListInstitutionService } from "../../services/institution/ListInstitutionService";

class ListInstitutionController {
  async handle(req: Request, res: Response) {
    const { latitude, longitude } = req.query;

    const listInstitutionService = new ListInstitutionService();

    const donation = await listInstitutionService.execute({
      latitude,
      longitude,
    });

    return res.json(donation);
  }
}

export { ListInstitutionController }