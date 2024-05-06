import prisma from "@/lib/db";
import { User } from "@prisma/client";

export async function getUserByEmail(email: string): Promise<null | User> {
  try {
    const dbUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!dbUser) return null;

    return dbUser;
  } catch (err) {
    return null;
  }
}

export async function getUserByUsername(
  username: string
): Promise<null | User> {
  try {
    const dbUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!dbUser) return null;

    return dbUser;
  } catch (err) {
    return null;
  }
}
