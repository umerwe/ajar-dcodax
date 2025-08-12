"use client"

import type React from "react"
import { AlertCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface StateHandlerProps {
  isLoading?: boolean
  isError?: boolean
  error?: Error | null
  isEmpty?: boolean

  // Customization props
  loadingText?: string
  errorTitle?: string
  errorMessage?: string
  emptyTitle?: string
  emptyMessage?: string
  emptyIcon?: React.ReactNode
  emptyActionText?: string
  emptyActionHref?: string
  onRetry?: () => void

  // Layout props
  className?: string
}

const StateHandler: React.FC<StateHandlerProps> = ({
  isLoading = false,
  isError = false,
  error = null,
  isEmpty = false,
  errorTitle = "Something went wrong",
  errorMessage,
  emptyTitle = "No data found",
  emptyMessage = "There's nothing to show here yet.",
  emptyIcon,
  emptyActionText = "Go back",
  emptyActionHref = "/",
  onRetry,
  className = "",
}) => {
  
  // Loading State
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center py-26 ${className}`}>
        <div className="text-center">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <div
              className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-blue-400 rounded-full animate-spin mx-auto opacity-60"
              style={{ animationDelay: "0.15s" }}
            ></div>
          </div>
        </div>
      </div>
    )
  }

  // Error State
  if (isError) {
    const displayErrorMessage = errorMessage || error?.message || "An unexpected error occurred. Please try again."

    return (
      <div className={`flex items-center justify-center py-16 ${className}`}>
        <div className="text-center max-w-md mx-auto">
          <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{errorTitle}</h3>
          <p className="text-gray-600 mb-6">{displayErrorMessage}</p>
          <div className="flex gap-3 justify-center">
            {onRetry && (
              <Button onClick={onRetry} variant="default" className="bg-red-600 hover:bg-red-700">
                Try Again
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Empty State
  if (isEmpty) {
    const defaultIcon = <Search className="w-16 h-16 text-gray-300" />

    return (
      <div className={`flex items-center justify-center py-16 ${className}`}>
        <div className="text-center max-w-md mx-auto">
          <div className="bg-gray-50 rounded-2xl shadow-sm border p-12">
            <div className="mb-4">{emptyIcon || defaultIcon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{emptyTitle}</h3>
            <p className="text-gray-600 mb-6">{emptyMessage}</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href={emptyActionHref}>{emptyActionText}</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default StateHandler
