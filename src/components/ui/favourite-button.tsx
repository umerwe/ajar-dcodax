"use client"

import { Heart } from "lucide-react"
import { useAddFavourite, useRemoveFavourite, useIsFavourite } from "@/hooks/useFavourite"
import { cn } from "@/lib/utils"

interface FavouriteButtonProps {
  listingId: string
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "card" | "minimal"
}

export const FavouriteButton = ({
  listingId,
  className,
  size = "md",
  variant = "default",
}: FavouriteButtonProps) => {
  const addFavourite = useAddFavourite()
  const removeFavourite = useRemoveFavourite()
  const isFavourite = useIsFavourite(listingId)

  const toggleFavourite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isFavourite) {
      removeFavourite.mutate(listingId)
    } else {
      addFavourite.mutate({ listingId })
    }

  }

  const sizeClasses = {
    sm: "p-1.5 w-7 h-7",
    md: "p-2 w-9 h-9",
    lg: "p-3 w-12 h-12",
  }

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  const variantClasses = {
    default: "bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm",
    card: "bg-white/90 backdrop-blur-sm hover:bg-white",
    minimal: "bg-transparent hover:bg-white/20",
  }

  return (
    <button
      onClick={toggleFavourite}
      disabled={addFavourite.isPending || removeFavourite.isPending}
      className={cn(
        "flex items-center justify-center rounded-full transition duration-200 group",
        sizeClasses[size],
        variantClasses[variant],
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      <Heart
        className={cn(
          "transition-colors duration-200",
          iconSizes[size],
          isFavourite
            ? "text-red-500 fill-red-500"
            : "text-gray-600 group-hover:text-red-500"
        )}
      />
    </button>
  )
}
