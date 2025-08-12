"use client"
import type React from "react"
import { ThemeProvider } from "./theme-provider"
import { NextIntlClientProvider, type Messages } from "next-intl"
import ReactQueryProvider from "./query-provider"
import type { DehydratedState } from "@tanstack/react-query"
import AuthGuard from "../auth/auth-guard"
import { Toaster } from "@/components/ui/toaster" // shadcn/ui's toast system

type Props = {
  children: React.ReactNode
  messages: Messages
  locale: string
  dehydratedState: DehydratedState
}

export default function Providers({ children, messages, locale, dehydratedState }: Props) {
  return (
    <ReactQueryProvider dehydratedState={dehydratedState}>
      <ThemeProvider>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthGuard>
            {children}
            <Toaster />
          </AuthGuard>
        </NextIntlClientProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  )
}
