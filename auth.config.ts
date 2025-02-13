import { compare } from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail } from "./lib/utils"
import { LoginSchema } from "./schemas"

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const validatedData = LoginSchema.safeParse(credentials)
        if (!validatedData.success) {
          return null
        }
        const { email, password } = validatedData.data
        const user = await getUserByEmail(email)
        if (!user || !user.password) return null // users logged in with social providers (Google, Github...) won't have passwords...
        const isCorrectPassword = await compare(password, user.password)
        if (isCorrectPassword) return user
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
