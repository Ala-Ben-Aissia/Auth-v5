"use server"

import { signIn } from "@/auth"
import { prisma } from "@/lib/client"
import { getUserByEmail } from "@/lib/utils"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema, RegisterSchema } from "@/schemas"
import { hash } from "bcryptjs"
import { AuthError } from "next-auth"
import { z } from "zod"

export async function login(data: z.infer<typeof LoginSchema>) {
  // Validate input data in the server side because client side validation can easily be bypassed by malicious users or bots.
  const validatedData = LoginSchema.safeParse(data)
  if (!validatedData.success) {
    return { success: false, message: "Invalid input data" }
  }

  const { email, password } = validatedData.data

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials" }
        case "OAuthSignInError":
          return {
            success: false,
            message: "Failed to sign in with OAuth provider",
          }
        default:
          return {
            success: false,
            message: "Failed to sign in. Please try again later.",
          }
      }
    }
    throw error // to redirect te user to the DEFAULT_LOGIN_REDIRECT (Next.js thing...)
  }
  return { success: true, message: "Login successful" }
}

export async function register(data: z.infer<typeof RegisterSchema>) {
  const validatedData = RegisterSchema.safeParse(data)

  if (!validatedData.success) {
    return { success: false, message: "Invalid input data" }
  }

  const { password, confirmPassword, name, email } =
    validatedData.data

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" }
  }

  const hashedPassword = await hash(password, 10)
  const exisitingUser = await getUserByEmail(email)

  if (exisitingUser) {
    return { success: false, message: "User already exists" }
  }

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
    return { success: true, message: "Register successful" }
  } catch (error) {
    console.error("🚨 Failed to create user:", error)
    return {
      success: false,
      message:
        "Failed to create user account. Please try again later.",
    }
  }
}
