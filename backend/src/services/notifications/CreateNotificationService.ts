import prismaClient from '../../prisma'

interface NotificationRequest {
  type: string;
  description: string;
}

class CreateNotificationService {
  async execute({ type, description }: NotificationRequest) {

    const notification = await prismaClient.notifications.create({
      data: {
        type: type,
        description: description,
      },
      select: {
        id: true,
        type: true,
        description: true,
      }
    })

    return notification;

  }
}

export { CreateNotificationService }