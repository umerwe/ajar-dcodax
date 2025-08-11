"use client";

import { useState } from "react";
import MainCard from "@/components/cards/main-card";
import Pagination from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMarketplaceListings } from "@/hooks/listing";

interface ListingContentProps {
  isHome?: boolean;
  initialCategory?: string;
}

const ListingContent = ({
  isHome,
  initialCategory,
}: ListingContentProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = isHome ? 5 : 10;

  const {
    data: listingsData,
    isLoading,
    isError,
    isFetching,
  } = useMarketplaceListings({
    page: currentPage,
    limit,
    ...(initialCategory ? { subCategory: initialCategory } : {}),
  });

  const allListings = listingsData?.listings ?? [];
  const totalCount = listingsData?.total ?? 0;

  const filteredListings = initialCategory
    ? allListings.filter(
        (item: Listing) =>
          typeof item.subCategory === "object" &&
          item.subCategory !== null &&
          item.subCategory._id === initialCategory
      )
    : allListings;

  const totalPages = Math.ceil(totalCount / limit);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isError) {
    return (
      <p className="text-center text-red-500 py-6">
        Failed to fetch listings
      </p>
    );
  }

  if (filteredListings.length === 0 && !isFetching) {
    return (
      <p className="text-center text-gray-600 py-6">No data found</p>
    );
  }

  return (
    <div className="mb-20">
      {isFetching && !isLoading && (
        <div className="text-center text-xs text-blue-500 mb-2">
          Updating...
        </div>
      )}

      <MainCard listings={filteredListings} />

      {!isHome && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {isHome && totalCount > filteredListings.length && (
        <div className="flex justify-center mt-4 mb-10">
          <Link href="/listing">
            <Button variant="destructive">Show more</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ListingContent;
