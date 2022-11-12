import { Request, Response } from "express";
import { CreateUserService } from '../../services/user/CreateUserService';

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, cpf, birthDate, phone, gender, address, bloodType, isActive, role, institutionId } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
      cpf,
      birthDate,
      gender,
      address,
      bloodType,
      phone,
      isActive,
      role,
      institutionId
    });

    return res.json(user)
  }
}

export { CreateUserController }