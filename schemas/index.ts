import { z } from "zod"

const LoginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(1, "Password is required")
})

const RegisterSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
  username: z.string().min(3, "Username must be at least 3 characters")
})

export { LoginSchema, RegisterSchema }
