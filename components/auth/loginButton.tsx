"use client"

import { useRouter } from "next/navigation"

type Props = {
  children: React.ReactNode
  mode?: "modal" | "redirect"
  asChild?: boolean
}

export default function LoginButton({ children, mode = "redirect" }: Props) {
  const router = useRouter()

  function onClick() {
    router.push("/auth/login")
  }

  if (mode === "modal") {
    return "Display modal"
  }

  return <span onClick={onClick}>{children}</span>
}
