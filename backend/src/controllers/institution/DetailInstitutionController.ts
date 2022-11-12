import { Request, Response } from "express";
import { DetailInstitutionService } from "../../services/institution/DetailInstitutionService" 

class DetailInstitutionController {
  async handle(req: Request, res: Response) {
    const institution_id = req.institution_id;

    const detailInstitutionService = new DetailInstitutionService();

    const institution = await detailInstitutionService.execute(institution_id);

    return res.json(institution);
  }
}

export { DetailInstitutionController }