import { BsCheckCircle } from "react-icons/bs"

export default function FormSuccess({ message }: { message: string }) {
  if (!message) return null

  return (
    <div className="bg-emerald-500/15 text-emerald-500 text-sm rounded-md flex items-center gap-x-2 p-3">
      <BsCheckCircle className="w-4 h-4" />
      <p>{message}</p>
    </div>
  )
}
