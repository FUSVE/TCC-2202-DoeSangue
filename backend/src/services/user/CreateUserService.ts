import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'
import { Address, EBloodType, ERole, EGender } from '@prisma/client';

interface UserRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  birthDate: string;
  phone: string;
  gender: EGender;
  bloodType: EBloodType;
  isActive: boolean;
  role: ERole;
  address: Address;
  institutionId: string;
}

class CreateUserService {
  async execute({ name, email, password, cpf, birthDate, phone, gender, bloodType, isActive, role, address, institutionId }: UserRequest) {
    
    if(!cpf) {
      throw new Error("CPF incorreto.")
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        cpf: cpf
      }
    })

    const passwordHash = await hash(password, 8)

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

    if(userAlreadyExists) {
      throw new Error("Este CPF já está em uso.")
    }

    if(role !== "admin") {
      const user = await prismaClient.user.create({
        data: {
          birthDate: birthDate,
          bloodType: bloodType,
          cpf: cpf,
          email: email,
          name: name,
          password: passwordHash,
          addressId: newAddressId,
          isActive: isActive,
          role: role,
          phone: phone,
          gender: gender,
        },
        select: {
          id: true,
          name: true,
          email: true,
          birthDate: true,
          gender: true,
          cpf: true,
          phone: true,
          role: true,
          addressId: true,
          isActive: true,
        }
      })

      return user;
    }

    const user = await prismaClient.user.create({
      data: {
        birthDate: birthDate,
        bloodType: bloodType,
        cpf: cpf,
        email: email,
        name: name,
        password: passwordHash,
        addressId: newAddressId,
        institutionId: institutionId,
        isActive: isActive,
        role: role,
        phone: phone,
        gender: gender,
      },
      select: {
        id: true,
        name: true,
        email: true,
        birthDate: true,
        gender: true,
        cpf: true,
        phone: true,
        role: true,
        addressId: true,
        isActive: true,
        institutionId: true,
      }
    })

    return user;
  }
}

export { CreateUserService }