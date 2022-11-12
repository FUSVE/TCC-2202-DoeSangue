import prismaClient from "../../prisma";

class ListUserService {
  async execute() {
    const user = await prismaClient.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        birthDate: true,
        gender: true,
        phone: true,
        role: true,
        bloodType: true,
        address: true
      }
    })

    return user;
  }
}

export { ListUserService }