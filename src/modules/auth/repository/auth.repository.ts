import { Prisma } from "../../../generated/prisma/client.js";
import { prisma } from "../../../infra/database/prisma.js";
import { DuplicateResourceError } from "../../../shared/errors/database/duplicate-resource-error.js";
import { CreateUserDTO } from "../types/auth.dto.js";

const userSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
} satisfies Prisma.UserSelect;

export const getUserById = (id: string) =>
  prisma.user.findUnique({
    where: { id },
    select: {
      ...userSelect,
    },
  });
export const getUserByEmail = (email: string) => prisma.user.findUnique({ where: { email } });
export const createuser = async (userData: CreateUserDTO) => {
  try {
    return await prisma.user.create({
      data: { ...userData },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new DuplicateResourceError("USER");
    }

    throw error;
  }
};
