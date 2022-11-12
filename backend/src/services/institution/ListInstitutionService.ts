import prismaClient from "../../prisma";
import { calcDistance } from "../../utils/calcDistance";

class ListInstitutionService {
  async execute({ latitude, longitude }) {

    const institution = await prismaClient.institution.findMany({
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
    });

    const institutionsList = institution.map((institution) => {
      const distance = calcDistance(latitude, longitude, Number(institution.latitude), Number(institution.longitude));
      return {institution, distance};
    });

    return institutionsList;
  }
}

export { ListInstitutionService }