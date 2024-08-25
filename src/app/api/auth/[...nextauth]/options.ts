import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/db";

let userId: number;

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session }) {
      const connection = await connectDB();
      try {
        const email = session.user?.email;

        const [rows] = await connection.execute(
          "SELECT * FROM users WHERE email = ?",
          [email]
        );

        if (rows.length === 0) {
          await connection.execute(
            "INSERT INTO users (email, name, created_time, last_session_time) VALUES (?, ?, Now(), NOW())"
          );
        } else {
          userId = rows[0].id;
          await connection.execute(
            "UPDATE users SET last_session_time = NOW() WHERE email = ?",
            [email]
          );
        }
        if(session.user) {
          session.user.id = userId as number;
        }
      } catch (error) {
        console.error(error);
      }
      return session;
    },
  },
};
