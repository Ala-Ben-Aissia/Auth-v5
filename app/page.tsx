import LoginButton from "@/components/auth/loginButton"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})

export default function Home() {
  return (
    <main className="h-full flex flex-col justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400  to-blue-800">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "font-bold text-4xl text-white",
            poppins.className
          )}
        >
          🔐 Auth
        </h1>
        <p className="text-lg text-white">
          A simple authentication app
        </p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  )
}
