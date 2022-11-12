import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'
import { sign, decode } from 'jsonwebtoken'

interface AuthRequest {
  cpf: string;
  password: string;
}

class AuthUserService {
  async execute({ cpf, password }: AuthRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        cpf: cpf
      }
    })

    if(!user) {
      throw new Error("CPF ou senha incorreto")
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch) {
      throw new Error("CPF ou senha incorreto")
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
        cpf: user.cpf
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )

    return { 
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      token: token,
      role: user.role,
    }
  }
}

export { AuthUserService }