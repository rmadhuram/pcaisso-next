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
    async session({ session, user, token }) {
      const connection = await connectDB();
      try {
        const email = session.user?.email;
        let userId = session.user?.id;

        const [rows] = await connection.execute(
          "SELECT * FROM users WHERE email = ?",
          [email]
        );

        if (rows.length === 0) {
            const result = await connection.execute("INSERT INTO users (email, name, created_time, last_session_time) VALUES (?, ?, Now(), NOW())",
            [email, session.user?.name]
          );
          userId = result.insertId as number;
        } else {
          userId= rows[0].id;
          await connection.execute(
            "UPDATE users SET last_session_time = NOW() WHERE email = ?",
            [email]
          );
        }
      } catch (error) {
        console.error(error);
      }
      return session;
    },
  },
};
