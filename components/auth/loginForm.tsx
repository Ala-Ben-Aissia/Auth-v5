"use client"

import { login } from "@/app/actions"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { LoginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { FiLoader } from "react-icons/fi"
import { z } from "zod"
import FormSuccess from "../formSuccess"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import CardWrapper from "./cardWrapper"
import FormError from "../formError"

export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{
    success: boolean
    message: string
  }>({
    success: false,
    message: ""
  })

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    startTransition(async () => {
      const res = await login(values)
      setResult(res)
    })
  }

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john.doe@example.com"
                      type="email"
                      disabled={isPending}
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="**********"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {result.success ? (
            <FormSuccess message={result.message} />
          ) : (
            <FormError message={result.message} />
          )}
          <Button type={"submit"} className="w-full" disabled={isPending}>
            {isPending ? <FiLoader className="animate-spin" /> : "Sign in"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
