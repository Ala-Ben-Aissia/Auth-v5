import Link from "next/link"
import { Button } from "../ui/button"

export default function BackButton({
  label,
  href,
}: {
  label: string
  href: string
}) {
  return (
    <Button variant={"link"} size={"sm"} className="w-full">
      <Link href={href}>{label}</Link>
    </Button>
  )
}
