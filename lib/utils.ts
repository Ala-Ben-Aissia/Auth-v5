import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { prisma } from "@/lib/client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } })
}

export function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } })
}
