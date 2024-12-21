import Link from "next/link"

type Props = {
  children: React.ReactNode
  mode?: "modal" | "redirect"
  asChild?: boolean
}

export default function LoginButton({
  children,
  mode = "redirect",
}: Props) {
  if (mode === "modal") {
    return "Display modal"
  }

  return <Link href="/auth/login">{children}</Link>
}
