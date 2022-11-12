import prismaClient from "../../prisma";

class ListNotificationService {
  async execute() {
    const notifications = await prismaClient.notifications.findMany({
      select: {
        type: true,
        description: true,
      }
    })

    return notifications;
  }
}

export { ListNotificationService }