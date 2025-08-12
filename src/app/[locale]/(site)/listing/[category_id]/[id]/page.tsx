"use client"
import AboutListing from "@/components/pages/listing-details/about-listing"
import CoreDetails from "@/components/pages/listing-details/core-details"
import ExploreArea from "@/components/pages/listing-details/explore-area"
import Header from "@/components/pages/listing-details/header"
import ImageGalleryLayout from "@/components/pages/listing-details/image-gallery-layout"
import PricingActions from "@/components/pages/listing-details/pricing-actions"
import Rating from "@/components/pages/listing-details/rating"
import UpperTabs from "@/components/pages/listing-details/upper-tabs"
import HostInfo from "@/components/pages/listing-details/host-info"
import LowerTabs from "@/components/pages/listing-details/lower-tabs"
import ServicesAmenities from "@/components/pages/listing-details/services-amenities"
import { useMarketplaceListings } from "@/hooks/listing"
import { useParams } from "next/navigation"
import StateHandler from "@/components/common/state-handler"
import { Home } from "lucide-react"

const ListingItems = () => {
  const params = useParams()

  const subCategory = params?.category_id as string
  const id = params?.id as string

  const { data: listingsData, isLoading, isError, error, refetch } = useMarketplaceListings({ subCategory })

  // Check if data exists and filter for specific property
  const listings = listingsData?.listings || []
  const filteredData = listings.filter((item: Listing) => item._id === id)
  const property = filteredData[0]

  return (
    <>
      <StateHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
        isEmpty={!isLoading && (!listingsData || listings.length === 0 || filteredData.length === 0)}
        loadingText="Loading property details..."
        errorTitle="Failed to load property"
        errorMessage="We couldn't load the property details. Please check your connection and try again."
        emptyTitle={filteredData.length === 0 && listings.length > 0 ? "Property not found" : "No properties available"}
        emptyMessage={
          filteredData.length === 0 && listings.length > 0
            ? `No property found with ID: ${id}. It may have been removed or doesn't exist.`
            : "No properties are available in this category at the moment."
        }
        emptyIcon={<Home className="w-16 h-16 text-gray-300 mx-auto" />}
        emptyActionText="Browse Properties"
        emptyActionHref="/listing"
        onRetry={() => refetch()}
      />

      {!isLoading && !isError && property && (
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
              {/* <GuestReview property={property} /> */}

              {/* <MostMentionedTabs property={property} /> */}

              {/* <GuestImpressions property={property} /> */}
            </div>
          </div>
          
          <ServicesAmenities />
        </div>
      )}
    </>
  )
}

export default ListingItems
