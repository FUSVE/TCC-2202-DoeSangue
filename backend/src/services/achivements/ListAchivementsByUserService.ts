import prismaClient from "../../prisma";

interface AchivementRequest {
  userId: string;
}

class ListAchivementsByUserService {
  async execute({ userId }: AchivementRequest) {
    const achivements = await prismaClient.userAchivements.findMany({
      where: {
        userId: userId
      }
    })

    await prismaClient.achivements.findMany({
      select: {
        name: true,
        description: true,
        icon: true,
      }
    })

    return achivements;
  }
}

export { ListAchivementsByUserService }