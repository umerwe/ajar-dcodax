"use client";

import Image from "next/image";
import { CardHeader } from "@/components/ui/card";
import { Heart } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import React, { useState, useEffect } from "react";


const CardTop = ({ property }: {property : Listing}) => {
  const images: string[] =
    "images" in property
      ? property.images?.slice(0, 5) : ["/placeholder.svg"]

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay({ delay: 3000, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <CardHeader className="p-0 relative">
      {/* Guest Favorite Badge and Heart Icon */}
      <div className="absolute top-2 sm:top-3 left-4 right-2 sm:right-4 flex justify-between items-center z-10">
        <div>
          {property.isGuestFavorite && (
            <div className="bg-white/90 backdrop-blur-sm px-3 rounded-full hidden sm:block pb-1">
              <span className="text-xs font-semibold">Guest favorite</span>
            </div>
          )}
        </div>
        <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {images.map((imgUrl, index) => (
            <div
              key={index}
              className="relative flex-[0_0_100%] h-40 min-[500px]:h-50 sm:h-64"
            >
              <Image
                src={`/${imgUrl}`}
                alt={`${imgUrl}-img`}
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-3 space-x-1.5 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-1.5 w-1.5 -mt-10 rounded-full transition-all duration-300 ${index === selectedIndex
              ? "bg-white w-2.5"
              : "bg-gray-300"
              }`}
          />
        ))}
      </div>
    </CardHeader>
  );
};

export default CardTop;
