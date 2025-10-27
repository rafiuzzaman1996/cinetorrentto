'use client'
import React, { useState, useRef } from "react"
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
  const submittingRef = useRef(false); // prevent double-submit synchronously


  const form = useForm<LoginFormType>({
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginFormType) {
    // Prevent double submission (handles fast double clicks before state updates)
    if (submittingRef.current) return;
    submittingRef.current = true;
    setLoading(true);

    let navigated = false;

    try {
      const result = await fetch("/admin-api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ensure browser accepts any Set-Cookie from the server
        body: JSON.stringify({ username: data.username, password: data.password }),
      });

      const userInfo = await result.json();

      if (result?.ok) {
        // keep UI disabled during the navigation
        localStorage.setItem("user", JSON.stringify(userInfo.user));
        toast.success("Login successful!");

        const params = new URLSearchParams(window.location.search);
        const callbackUrl = params.get("callbackUrl") || "/manage";

        // await navigation; only mark navigated true if it completes
        try {
          await router.push(callbackUrl);
          navigated = true;
        } catch {
          // If push fails for some reason, show error and allow re-enable below
          toast.error("Redirect failed. Please try again.");
        }

        // If navigation succeeded, keep UI disabled (component will unmount on successful nav)
        if (navigated) return;
        // otherwise fall through to re-enable UI so user can try again
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      // Only re-enable if navigation did not succeed
      if (!navigated) {
        submittingRef.current = false;
        setLoading(false);
      }
    }
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
              {/* disable inputs while loading to prevent clicks */}
              <fieldset disabled={loading} aria-busy={loading} className="space-y-6">
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
              </fieldset>

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
