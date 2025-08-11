"use client"
import type React from "react"
import { ThemeProvider } from "./theme-provider"
import { NextIntlClientProvider, type Messages } from "next-intl"
import ReactQueryProvider from "./query-provider" // This is now your hydration provider
import type { DehydratedState } from "@tanstack/react-query";

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
          {children}
        </NextIntlClientProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  )
}
