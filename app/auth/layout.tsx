import { PropsWithChildren } from "react"

export default function LoginLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-full flex justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      {children}
    </div>
  )
}
