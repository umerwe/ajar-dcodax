"use client";
import Image from "next/image";
import { useState } from "react";
import { PhotoGallery } from "./photo-gallery";
import { Heart, Images } from "lucide-react";

interface ImageProps {
  images: string[];
}

const ImageGalleryLayout = ({ property }: { property: ImageProps }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="py-6">
      <div className="flex flex-col md:flex-row gap-2 h-auto">
        {/* Big Left Image */}
        <div className="w-full md:w-[45%] lg:w-[45%] h-[250px] sm:h-[280px] md:h-auto xl:h-[340px] min-h-[250px] relative rounded-lg overflow-hidden">
          <Image
            src={`/${property.images[0]}` || "/placeholder.svg"}
            alt="Main image"
            fill
            className="object-cover cursor-pointer"
            onClick={() => setIsGalleryOpen(true)}
          />
        </div>

        {/* Right Side Grid */}
        <div className="w-full md:w-[55%] lg:w-[55%] h-auto md:h-[280px] xl:h-[340px]">
          {/* Mobile: Horizontal scroll (keep as is) */}
          <div className="md:hidden">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {property.images.slice(1, 7).map((img, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-lg overflow-hidden group"
                >
                  <Image
                    src={`/${img}` || "/placeholder.svg"}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover cursor-pointer"
                    onClick={() => setIsGalleryOpen(true)}
                  />
                  {/* Heart icon on 3rd image */}
                  {index === 2 && (
                    <button
                      className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white transition"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart
                        className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                      />
                    </button>
                  )}
                  {/* Overlay on last image */}
                  {index === 5 && (
                    <div
                      className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white cursor-pointer"
                      onClick={() => setIsGalleryOpen(true)}
                    >
                      <Image src={"/image-icon.png"} width={20} height={20} alt="image-icon" />
                      <span className="text-xs font-medium mt-1">See All {property.images.length}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Medium screens and above: 3x2 Grid */}
          <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-2 h-full">
            {property.images.slice(1, 7).map((img, index) => (
              <div key={index} className="relative w-full h-full rounded-lg overflow-hidden group">
                <Image
                  src={`/${img}` || "/placeholder.svg"}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover cursor-pointer"
                  onClick={() => setIsGalleryOpen(true)}
                />
                {/* Heart icon on 3rd image (top-right) */}
                {index === 2 && (
                  <button
                    className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white transition"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart
                      className={`w-4.5 h-4.5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                    />
                  </button>
                )}
                {/* Overlay on last image (bottom-right) */}
                {index === 5 && (
                  <div
                    className="absolute inset-0 bg-black/50 flex flex-col gap-2 items-center justify-center text-white cursor-pointer"
                    onClick={() => setIsGalleryOpen(true)}
                  >
                    <Images />
                    <span className="text-xs font-medium">See All {property.images.length} Photos</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <PhotoGallery
        images={property.images}
        open={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
};

export default ImageGalleryLayout;