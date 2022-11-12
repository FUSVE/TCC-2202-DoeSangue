import prismaClient from "../../prisma";

interface DonationRequest {
  userId: string;
}

class ListByUserDonationService {
  async execute({ userId }: DonationRequest) {

    const findByUser = await prismaClient.donations.findMany({

      where: {
        userId: userId
      }

    })

    return findByUser;

  }
}

export { ListByUserDonationService }