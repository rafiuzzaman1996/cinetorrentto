import { LoginForm } from "@/components/website/login-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <>
      <div className="container pt-6">
        <Link
          href="/"
        >
        <ArrowLeft className="h-5 w-5" />
        </Link>
      </div>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </>
  )
}
