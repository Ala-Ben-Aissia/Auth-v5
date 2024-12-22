import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(1, "Password is required"),
})

export { loginSchema }
