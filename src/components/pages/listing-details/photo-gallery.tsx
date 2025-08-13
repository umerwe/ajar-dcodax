"use client"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent,DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface PhotoGalleryProps {
  images: string[]
  open: boolean
  onClose: () => void
}

export const PhotoGallery = ({ images, open, onClose }: PhotoGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm sm:max-w-6xl h-[90vh] sm:h-[80vh] md:h-[85vh] p-0 flex flex-col">
        <VisuallyHidden>
          <DialogTitle>Photo Gallery</DialogTitle>
        </VisuallyHidden>
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
            {currentIndex + 1} of {images.length} photos
          </h3>
          
          <Button variant="ghost" onClick={onClose}>
            <X style={{ width: '20px', height: '20px' }} />
          </Button>
        </div>

        {/* Image viewer */}
        <div className="relative flex-1 bg-black flex items-center justify-center">
          <div className="relative w-full h-full max-h-[calc(90vh-150px)] sm:max-h-[calc(80vh-150px)]">
            <Image
              src={images[currentIndex]}
              alt={`Property photo ${currentIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full"
                onClick={goToNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>

        {/* Thumbnail carousel */}
        <div className="px-4 py-3 border-t overflow-x-auto">
          <div className="flex gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                  index === currentIndex ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
