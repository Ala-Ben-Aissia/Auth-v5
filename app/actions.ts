"use server"

import { wait } from "@/lib/utils"
import { LoginSchema, RegisterSchema } from "@/schemas"
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
  const { password, confirmPassword } = validatedData.data
  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" }
  }
  await wait(1000)
  return { success: true, message: "Register successful" }
}
