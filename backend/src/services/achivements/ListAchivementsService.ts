import prismaClient from "../../prisma";

interface AchivementRequest {
  userId: string;
}


class ListAchivementsService {
  async execute({ userId }: AchivementRequest) {

    const userAchivements = await prismaClient.userAchivements.findMany({
      where: {
        userId: userId,

      }
    });

    const achivements = await prismaClient.achivements.findMany();

    achivements.map((achivement: any) => {
      const userAchivement = userAchivements.find(userAchivement => userAchivement.achivementId === achivement.id);

      if (userAchivement) {
        achivement.achieved = true;
      }
    })


    return achivements;
  }
}

export { ListAchivementsService }