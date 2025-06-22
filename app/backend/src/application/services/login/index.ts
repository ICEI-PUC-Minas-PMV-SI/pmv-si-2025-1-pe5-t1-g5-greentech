import prisma from "@database/postgresql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Credentials } from "./types";
import { JWT_EXPIRATION, JWT_SECRET } from "@config/env";

export default class LoginService {
  public static async authenticateUser({ email, password }: Credentials) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      throw new Error("Invalid email or password");
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
