import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";
import User from "@/models/User";

const options = NextAuth({
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials: any) {
        await connect();

        const { email, password } = credentials as { email: string, password: string }

        try {
          const user = await User.findOne({ email });

          if (user) {
            const validPassword = await bcrypt.compare(password, user.password);

            if (validPassword)
              return user;
          }

          throw new Error("Credentials erradas!");
        } catch (err: any) {
          throw new Error(err);
        }
      }
    })
  ],
  pages: {
    error: '/login'
  }
});

export { options as GET, options as POST };