'use client'
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react";
import { toast } from "sonner"
import { Loader } from "lucide-react"

// Schema for form validation
export const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
})

export type LoginFormType = z.infer<typeof schema>

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);


  const form = useForm<LoginFormType>({
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginFormType) {
    console.log("Form submitted:", data)
    setLoading(true);

    // Sign in using NextAuth.js
    const result = await signIn("credentials", {
      redirect: false, // Prevent automatic redirection
      username: data.username,
      password: data.password,
    });

    // Handle errors
    if (result?.ok) {
      toast.success("Login successful!");
      router.push("/manage");
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="m@example.com"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={loading} type="submit" className="w-full">
                {loading ?
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </> : "Login"}
              </Button>

              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
