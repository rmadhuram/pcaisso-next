import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/db";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      const connection = await connectDB();
      try {
        const username = user.name;

        const [rows] = await connection.execute(
          "SELECT * FROM users WHERE username = ?",
          [username]
        );

        if (rows.length === 0) {
          await connection.execute(
            "INSERT INTO users (username, created_time, last_session_time) VALUES (?, Now(), NOW())",
            [username]
          );
        } else {
          await connection.execute(
            "UPDATE users SET last_session_time = NOW() WHERE username = ?",
            [username]
          );
        }
        return true;
      } catch (error) {
        console.log("Error during sign in: ", error);
        return false;
      }
    },
  },
};
