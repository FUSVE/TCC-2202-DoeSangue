import prismaClient from "../../prisma";

class ListDonationService {
  async execute() {
    const donation = await prismaClient.donations.findMany({
      select: {
        quantity: true,
        createdAt: true,
        userId: true,
        user: true,
      }
    })

    return donation;
  }
}

export { ListDonationService }