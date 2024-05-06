import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/lib/authSchema";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/model/user";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedCredentials = LoginSchema.safeParse(credentials);

        if (!validatedCredentials.success) {
          return null;
        }

        const { password, email } = validatedCredentials.data;

        const dbUser = await getUserByEmail(email);

        if (!dbUser || !dbUser.password) {
          return null;
        }

        const matchPassword = await bcrypt.compare(password, dbUser.password);
        if (!matchPassword) return null;

        return dbUser;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.username) token.username = user.username;
      return token;
    },
    session({ token, session }) {
      if (token?.sub) session.user.id = token.sub;
      if (token.username) session.user.username = token.username;
      return session;
    },
  },
});
