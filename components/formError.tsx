import { BsExclamationTriangle } from "react-icons/bs"

export default function FormError({ message }: { message?: string }) {
  if (!message) return null

  return (
    <div className="bg-destructive/15 text-destructive text-sm rounded-md flex items-center gap-x-2 p-3">
      <BsExclamationTriangle className="w-4 h-4" />
      <p>{message}</p>
    </div>
  )
}
