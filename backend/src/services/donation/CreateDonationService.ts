import prismaClient from '../../prisma'
import { differenceInYears } from 'date-fns'

interface DonationRequest {
  quantity: number;
  userId: string;
}

class CreateDonationService {
  async execute({ quantity, userId }: DonationRequest) {

    if (!userId) {
      throw new Error("Doação inválida pois não possui doador.")
    }

    const donation = await prismaClient.donations.create({
      data: {
        quantity: quantity,
        userId: userId,
      },
      select: {
        quantity: true,
        userId: true,
        createdAt: true,
      }
    })

    const checkCountUserDonations = await prismaClient.donations.count({
      where: {
        userId: userId
      }
    })

    // Primeira doação
    if (checkCountUserDonations === 1) {

      const idAchivementFirstDonation = await prismaClient.achivements.findFirst({
        where: {
          slug: "primeira-doacao"
        }
      })

      const checkIfAchivementFirstDonationIsExists = await prismaClient.userAchivements.findFirst({
        where: {
          userId: userId,
          achivementId: idAchivementFirstDonation.id
        }
      })

      if (checkIfAchivementFirstDonationIsExists) {
        return
      }

      await prismaClient.userAchivements.create({
        data: {
          userId: userId,
          achivementId: idAchivementFirstDonation.id
        }
      })
    }

    // Três doações
    if (checkCountUserDonations >= 3) {

      const idAchivementFirstDonation = await prismaClient.achivements.findFirst({
        where: {
          slug: "tres-doacoes"
        }
      })

      await prismaClient.userAchivements.create({
        data: {
          userId: userId,
          achivementId: idAchivementFirstDonation.id
        }
      })
    }

    // Cinco doações
    if (checkCountUserDonations >= 5) {

      const idAchivementFirstDonation = await prismaClient.achivements.findFirst({
        where: {
          slug: "cinco-doacoes"
        }
      })

      await prismaClient.userAchivements.create({
        data: {
          userId: userId,
          achivementId: idAchivementFirstDonation.id
        }
      })
    }

    // Dez doações
    if (checkCountUserDonations >= 10) {

      const idAchivementFirstDonation = await prismaClient.achivements.findFirst({
        where: {
          slug: "dez-doacoes"
        }
      })

      await prismaClient.userAchivements.create({
        data: {
          userId: userId,
          achivementId: idAchivementFirstDonation.id
        }
      })
    }

    // 3 ou mais doações no intervalo de um ano
    if (checkCountUserDonations >= 3) {
      const lastThreeDonations = await prismaClient.donations.findMany({
        where: {
          userId: userId
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 3,
      })

      const firstOfThree = lastThreeDonations[0].createdAt

      const lastOfThree = lastThreeDonations[2].createdAt

      if (firstOfThree && lastOfThree) {
        const difference = differenceInYears(firstOfThree, lastOfThree)

        if (difference < 1) {
          const idAchivementThreeDonationsInYear = await prismaClient.achivements.findFirst({
            where: {
              slug: "tres-doacoes-ano"
            }
          })

          const checkIfUserHasAchivement = await prismaClient.userAchivements.findFirst({
            where: {
              userId: userId,
              achivementId: idAchivementThreeDonationsInYear.id
            }
          })

          if (!checkIfUserHasAchivement) {
            await prismaClient.userAchivements.create({
              data: {
                userId: userId,
                achivementId: idAchivementThreeDonationsInYear.id
              }
            })
          }
        }
      }
    }

    return donation;
  }
}

export { CreateDonationService }