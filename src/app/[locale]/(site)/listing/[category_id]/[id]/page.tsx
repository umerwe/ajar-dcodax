"use client";

import React, { useState } from "react";
import AboutListing from "@/components/pages/listing-details/about-listing";
import CoreDetails from "@/components/pages/listing-details/core-details";
import ExploreArea from "@/components/pages/listing-details/explore-area";
// import GuestLikedPost from "@/components/pages/listing-details/guest-liked.";
import Header from "@/components/pages/listing-details/header";
import ImageGalleryLayout from "@/components/pages/listing-details/image-gallery-layout";
import PricingActions from "@/components/pages/listing-details/pricing-actions";
import Rating from "@/components/pages/listing-details/rating";
import UpperTabs from "@/components/pages/listing-details/upper-tabs";
// import { propertiesData } from "@/data/properties-data";
// import Features from "@/components/features";
import HostInfo from "@/components/pages/listing-details/host-info";
import LowerTabs from "@/components/pages/listing-details/lower-tabs";
// import GuestReview from "@/components/pages/listing-details/guest-review";
// import MostMentionedTabs from "@/components/pages/listing-details/most-mentioned-tabs";
// import GuestImpressions from "@/components/pages/listing-details/guest-impressions";
import ServicesAmenities from "@/components/pages/listing-details/services-amenities";
// import { vehiclesData } from "@/data/vehicles-data";
// import { roomsData } from "@/data/rooms-data";
// import { appartmentsData } from "@/data/appartments-data";
import { useMarketplaceListings } from "@/hooks/listing";
import { useParams } from "next/navigation";

// type ListingData =
//   | PropertyCardProps
//   | RoomCardProps
//   | AppartmentsCardProps
//   | VehicleCardProps;

const ListingItems = () => {
  const params = useParams();
  const id = params?.id as string;
  // const category = params?.category as string;
  const [currentPage] = useState(1);
  const limit = 10;
  
    const {
      data: listingsData = { listings: [], total: 0 }
    } = useMarketplaceListings({ page: currentPage, limit })

  const data:Listing[]= listingsData.listings;

  const filteredData = data.filter((item) => item._id === id);

  if (filteredData.length === 0) {
    return (
      <div className="p-10 text-center text-gray-600">
        No property found with name: <b>{id}</b>
      </div>
    );
  }

  const property = filteredData[0];

  return (
    <div className="mx-3 sm:mx-7">
      <Header property={property} title="Rental Details" />

      <ImageGalleryLayout property={property} />

      <UpperTabs id={id} />

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 px-3 md:px-6">
        {/* LEFT COLUMN */}
        <div className="w-full md:w-3/5 lg:w-2/3 flex flex-col gap-4">
          <CoreDetails property={property} />

          {/* <Features
            freeCancellation={property.freeCancellation}
            noPrepayment={property.noPrepayment}
            layout="inline"
          /> */}

          <Rating property={property} />

          {/* <GuestLikedPost property={property} /> */}

          <AboutListing property={property} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full md:w-2/5 lg:w-1/3 space-y-3 md:space-y-4">
          <PricingActions property={property} />
          <ExploreArea property={property} />
        </div>
      </div>

      <div className="sm:px-3">
        <HostInfo property={property} />

        <LowerTabs id={id} />

        <div className="mt-8">
          {/* <GuestReview property={property} />

          <MostMentionedTabs property={property} /> */}

          {/* <GuestImpressions property={property} /> */}
        </div>
      </div>

      <ServicesAmenities />
    </div>
  );
};

export default ListingItems;
