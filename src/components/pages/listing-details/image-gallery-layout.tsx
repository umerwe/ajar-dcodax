"use client";
import Image from "next/image";
import { useState } from "react";
import { Images } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

interface ImageProps {
  images: string[];
}

const ImageGalleryLayout = ({ property }: { property: ImageProps }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <div className="py-6">
      <div className="flex flex-col md:flex-row gap-2 h-auto">
        {/* Big Left Image */}
        <div className="w-full md:w-[45%] lg:w-[45%] h-[250px] sm:h-[280px] md:h-auto xl:h-[340px] min-h-[250px] relative rounded-lg overflow-hidden">
          <Image
            src={property.images[0]}
            alt="Main image"
            fill
            className="object-cover cursor-pointer"
            onClick={() => openLightbox(0)}
          />
        </div>

        {/* Right Side Grid */}
        <div className="w-full md:w-[55%] lg:w-[55%] h-auto md:h-[280px] xl:h-[340px]">
          <div className="md:hidden">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {property.images.slice(1, 7).map((img, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-lg overflow-hidden group"
                >
                  <Image
                    src={img}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover cursor-pointer"
                    onClick={() => openLightbox(index + 1)}
                  />
                  {index === 5 && (
                    <div
                      className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white cursor-pointer"
                      onClick={() => openLightbox(index + 1)}
                    >
                      <Images />
                      <span className="text-xs font-medium mt-1">
                        See All {property.images.length}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-2 h-full">
            {property.images.slice(1, 7).map((img, index) => (
              <div
                key={index}
                className="relative w-full h-full rounded-lg overflow-hidden group"
              >
                <Image
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover cursor-pointer"
                  onClick={() => openLightbox(index + 1)}
                />

                {index === 5 && (
                  <div
                    className="absolute inset-0 bg-black/50 flex flex-col gap-2 items-center justify-center text-white cursor-pointer"
                    onClick={() => openLightbox(index + 1)}
                  >
                    <Images />
                    <span className="text-xs font-medium">
                      See All {property.images.length} Photos
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          open
          close={closeLightbox}
          index={lightboxIndex}
          slides={property.images.map((src, i) => ({
            src,
            title: `Photo ${i + 1}`,
          }))}
          plugins={[Thumbnails, Captions]}
        />
      )}
    </div>
  );
};

export default ImageGalleryLayout;
