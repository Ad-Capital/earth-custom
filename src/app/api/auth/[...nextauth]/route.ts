import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validUsername = process.env.ADMIN_USERNAME;
        const validPassword = process.env.ADMIN_PASSWORD;

        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        if (
          credentials.username === validUsername &&
          credentials.password === validPassword
        ) {
          return { id: "1", name: "Admin User" };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ Correct export for Next.js App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; // 🚀 This fixes the error
