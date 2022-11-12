import { Request, Response } from "express";
import { CreateNotificationService } from "../../services/notifications/CreateNotificationService";

class CreateNotificationController {
  async handle(req: Request, res: Response) {

    const { type, description } = req.body;

    const createNotificationService = new CreateNotificationService();

    const notification = await createNotificationService.execute({
      type,
      description,
    });

    return res.json(notification);
  }
}

export { CreateNotificationController }