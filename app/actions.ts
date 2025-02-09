"use server"

import { prisma } from "@/lib/client"
import { getUserByEmail, wait } from "@/lib/utils"
import { LoginSchema, RegisterSchema } from "@/schemas"
import { hash } from "bcryptjs"
import { z } from "zod"

export async function login(data: z.infer<typeof LoginSchema>) {
  // Validate input data in the server side because client side validation can easily be bypassed by malicious users or bots.
  const validatedData = LoginSchema.safeParse(data)
  if (!validatedData.success) {
    return { success: false, message: "Invalid input data" }
  }
  await wait(1000)
  return { success: true, message: "Login successful" }
}

export async function register(data: z.infer<typeof RegisterSchema>) {
  const validatedData = RegisterSchema.safeParse(data)

  if (!validatedData.success) {
    return { success: false, message: "Invalid input data" }
  }

  const { password, confirmPassword, name, email } = validatedData.data

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" }
  }

  const hashedPassword = await hash(password, 10)
  const ExisitingUser = await getUserByEmail(email)

  if (ExisitingUser) {
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
    console.error("Failed to create user:", error)
    return {
      success: false,
      message: "Failed to create user account. Please try again later.",
    }
  }
}
