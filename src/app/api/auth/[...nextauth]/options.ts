import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import getPool from "@/lib/db";
import { addOrUpdateUser } from "@/persistence/user";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session }) {
      const connection = await getPool();
      try {
        if (!session.user) {
          throw new Error("User object is missing");
        }

        const userId = await addOrUpdateUser(
          session.user?.email || "",
          session.user?.name || "",
          session.user?.image || ""
        );
        session.user.id = userId as number;
      } catch (error) {
        console.error(error);
      }
      return session;
    },
  },
};
