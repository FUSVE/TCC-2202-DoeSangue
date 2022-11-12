import prismaClient from '../../prisma'
import { Address } from '@prisma/client';

interface InstitutionRequest {
  name: string;
  cnpj: string;
  email: string;
  photo: string;
  latitude: string;
  longitude: string;
  address: Address
}

class CreateInstitutionService {
  async execute({ name, cnpj, email, photo, address, latitude, longitude }: InstitutionRequest) {

    if(!cnpj) {
      throw new Error("CNPJ incorreto.")
    }

    const institutionAlreadyExists = await prismaClient.institution.findFirst({
      where: {
        cnpj: cnpj
      }
    })

    let newAddressId: string = "";

    const findIsExistsAddress = await prismaClient.address.findFirst({
      where: {
        AND: {
          street: address.street,
          logradouro: address.logradouro,
          cep: address.cep,
          city: address.city,
          uf: address.uf,
          district: address.district,
        }
      }
    })

    if(findIsExistsAddress) {
      newAddressId = findIsExistsAddress.id
    } else {
      const newAddress = await prismaClient.address.create({
        data: {
          street: address.street,
          logradouro: address.logradouro,
          cep: address.cep,
          city: address.city,
          uf: address.uf,
          district: address.district,
        }
      })

      newAddressId = newAddress.id;
    }

    if(institutionAlreadyExists) {
      throw new Error("Este CNPJ já está em uso.")
    }

    const institution = await prismaClient.institution.create({
      data: {
        email: email,
        name: name,
        cnpj: cnpj,
        photo: photo,
        latitude: latitude,
        longitude: longitude,
        addressId: newAddressId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        addressId: true,
        photo: true,
        latitude: true,
        longitude: true,
        cnpj: true,
      }
    })

    return institution;

  }
}

export { CreateInstitutionService }