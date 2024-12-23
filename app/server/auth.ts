import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        return { id: "" };
        // let user = null;

        // // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password);

        // // logic to verify if the user exists
        // user = await getUserFromDb(credentials.email, pwHash);

        // if (!user) {
        //   // No user found, so this is their first attempt to login
        //   // Optionally, this is also the place you could do a user registration
        //   throw new Error("Invalid credentials.");
        // }

        // // return user object with their profile data
        // return user;
      },
    }),
  ],
});
