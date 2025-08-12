"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FavouriteButton } from "@/components/ui/favourite-button"
import { RemoveFavouriteButton } from "@/components/ui/remove-favourite-button"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useState, useEffect } from "react"

interface PropertyCardProps {
  property: any
  showRemoveButton?: boolean
  className?: string
}

export const PropertyCard = ({ property, showRemoveButton = false, className }: PropertyCardProps) => {
  const images: string[] = property.images?.slice(0, 5) || ["/placeholder.svg"]

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000, stopOnMouseEnter: true })])

  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)
    onSelect()

    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <CardHeader className="p-0 relative">
        {/* Top overlay with guest favorite badge and action buttons */}
        <div className="absolute top-2 sm:top-3 left-4 right-2 sm:right-4 flex justify-between items-center z-10">
          <div>
            {property.isGuestFavorite && (
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full hidden sm:block">
                <span className="text-xs font-semibold text-gray-800">Guest favorite</span>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {showRemoveButton && <RemoveFavouriteButton listingId={property._id} />}
            {!showRemoveButton && <FavouriteButton listingId={property._id} variant="card" />}
          </div>
        </div>

        {/* Image carousel */}
        <div className="overflow-hidden rounded-t-lg" ref={emblaRef}>
          <div className="flex">
            {images.map((imgUrl, index) => (
              <div key={index} className="relative flex-[0_0_100%] h-48 sm:h-56">
                <Image src={`/${imgUrl}`} alt={`Property image ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel dots */}
        {images.length > 1 && (
          <div className="flex justify-center mt-3 space-x-1.5 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-1.5 w-1.5 -mt-10 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? "bg-white w-2.5" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
              {property.title || `Property ${property._id}`}
            </h3>
            <p className="font-bold text-lg text-gray-900">${property.price?.toLocaleString()}</p>
          </div>

          {property.location && <p className="text-sm text-gray-600 line-clamp-1">{property.location}</p>}

          {property.description && <p className="text-sm text-gray-700 line-clamp-2">{property.description}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
