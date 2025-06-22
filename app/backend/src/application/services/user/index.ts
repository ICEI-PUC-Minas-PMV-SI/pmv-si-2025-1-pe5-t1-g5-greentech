import prisma from "@database/postgresql";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { CreateUser, UpdateUser } from "./types";

export default class UserService {
  public static async get(id: User["id"]) {
    return await prisma.user.findFirst({ where: { id }});
  }

  public static async getAll() {
    return await prisma.user.findMany();
  }

  public static async update(id: User["id"], user: UpdateUser) {
    return await prisma.user.update({ data: user, where: { id }});
  }

  public static async remove(id: User["id"]) {
    return await prisma.user.delete({ where: { id }});
  }

  public static async create(user: CreateUser) {
    const { name, email, permission, password } = user;

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        permission,
        passwordHash,
      },
    });

    const { passwordHash: _, ...safeUser } = newUser;

    return safeUser;
  }
}