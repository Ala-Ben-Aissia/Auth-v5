import authConfig from "@/auth.config"
import { prisma } from "@/lib/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"
import NextAuth, { type DefaultSession } from "next-auth"
import "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole
  }
}

declare module "next-auth" {
  interface User {
    role?: UserRole
  }

  interface Session {
    user?: {
      role: UserRole
    } & DefaultSession["user"]
  }
}

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async jwt({ token, user }) {
      // if (user) token.id = user.id
      // Add user ID to the JWT token when a user signs in
      // This ensures the user ID is available in subsequent requests
      if (user?.role) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      // session.user.id = token.id as string
      // Add the user ID from the token to the session object
      // This makes the user ID available on the client side
      // through useSession() or getSession()
      if (token.sub) session.user.id = token.sub // sub is the id
      if (token.role) session.user.role = token.role
      return session
    },
  },
  /*
  The key points about these callbacks:
  1. The `jwt` callback runs when a JWT is created/updated. It lets you add custom data (like user ID) to the token.
  2. The `session` callback runs whenever a session is checked. It syncs the token data with the session object that gets sent to the client.
  */
})
