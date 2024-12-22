import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import BackButton from "./backButton"
import Header from "./header"

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

export default function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        {showSocial && (
          <div className="flex justify-center items-center gap-x-2 w-full">
            <Button
              size={"lg"}
              variant={"outline"}
              className="w-full"
            >
              <FcGoogle className="w-5 h-5" />
            </Button>
            <Button
              size={"lg"}
              variant={"outline"}
              className="w-full"
            >
              <FaGithub className="w-5 h-5" />
            </Button>
          </div>
        )}
      </CardFooter>
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  )
}
