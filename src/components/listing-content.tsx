"use client"

import { useState } from "react"
import MainCard from "@/components/cards/main-card"
import Pagination from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useMarketplaceListings } from "@/hooks/listing"
import StateHandler from "@/components/common/state-handler"
import { Search } from "lucide-react"

interface ListingContentProps {
  isHome?: boolean
  initialCategory?: string
}

const ListingContent = ({ isHome, initialCategory }: ListingContentProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const limit = isHome ? 5 : 10

  const { data, isLoading, isError, isFetching, refetch } = useMarketplaceListings({
    page: currentPage,
    limit,
    ...(initialCategory ? { subCategory: initialCategory } : {}),
  })

  const listings = data?.listings ?? []
  const totalCount = data?.total ?? 0

  const filteredListings = initialCategory
    ? listings.filter(
        (item: Listing) =>
          typeof item.subCategory === "object" && item.subCategory !== null && item.subCategory._id === initialCategory,
      )
    : listings

  const totalPages = Math.ceil(totalCount / limit)

  // Handle pagination page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="mb-20">
      <StateHandler
        isLoading={isLoading}
        isError={isError}
        isEmpty={!isFetching && filteredListings.length === 0}
        loadingText="Loading listings..."
        errorTitle="Failed to load listings"
        errorMessage="We couldn't load the listings. Please check your connection and try again."
        emptyTitle="No listings found"
        emptyMessage={
          initialCategory
            ? "No listings found in this category. Try browsing other categories."
            : "No listings available at the moment. Check back later for new properties."
        }
        emptyIcon={<Search className="w-16 h-16 text-gray-300 mx-auto" />}
        emptyActionText="Browse All Listings"
        emptyActionHref="/listing"
        onRetry={() => refetch()}
      />

      {!isLoading && !isError && filteredListings.length > 0 && (
        <>
          <MainCard listings={filteredListings} />

          {!isHome && totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}

          {isHome && totalCount > filteredListings.length && (
            <div className="flex justify-center mt-4 mb-10">
              <Link href="/listing">
                <Button variant="destructive">Show more</Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ListingContent
