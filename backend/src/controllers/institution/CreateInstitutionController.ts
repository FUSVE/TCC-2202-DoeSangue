import { Request, Response } from "express";
import { CreateInstitutionService } from "../../services/institution/CreateInstitutionService";

class CreateInstitutionController {
  async handle(req: Request, res: Response) {
    const { name, email, cnpj, photo, latitude, longitude, address } = req.body;

    const createInstitutionService = new CreateInstitutionService();

    const institution = await createInstitutionService.execute({
      name,
      email,
      cnpj,
      photo,
      latitude,
      longitude,
      address,
    });

    return res.json(institution)
  }
}

export { CreateInstitutionController }