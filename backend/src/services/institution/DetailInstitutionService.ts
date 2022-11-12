import prismaClient from "../../prisma";

class DetailInstitutionService {
  async execute(institution_id: string) {

    const institution = await prismaClient.institution.findFirst({
      where: {
        id: institution_id
      },
      select: {
        id: true,
        name: true,
        email: true,
        cnpj: true,
        photo: true,
        latitude: true,
        longitude: true,
        address: true,
      }
    })
    return institution;
  }
}

export { DetailInstitutionService }