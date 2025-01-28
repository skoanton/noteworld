import { PrismaClient, Role, User } from "@prisma/client";
import bcryptjs from "bcryptjs";
const prisma = new PrismaClient();

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}


export async function createUser(email: string,role: Role = Role.USER) {

  if (!Object.values(Role).includes(role)) {
    throw new Error(`Invalid role: ${role}`);
  }

  return prisma.user.create({
    data: {
      email,
      role
    },
  });
}

export async function createPassword(password: string,user: User) {
  return prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: await bcryptjs.hash(password, 10),
      firstLogin: false,
    },
  });
}