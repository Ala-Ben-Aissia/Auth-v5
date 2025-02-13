import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"

export default async function Settings() {
  const session = await auth()

  return (
    <div>
      <pre>session: {JSON.stringify(session, null, 2)}</pre>
      <form
        action={async () => {
          "use server"
          await signOut({ redirectTo: "/auth/login" })
        }}
      >
        <Button variant="destructive">Logout</Button>
      </form>
    </div>
  )
}
