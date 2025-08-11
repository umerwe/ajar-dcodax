import type React from "react"
import ListingContent from "@/components/listing-content"

// This is an async Server Component for SEO benefits
export default async function CategoryPage({
  // Explicitly type params as a Promise to satisfy Next.js's internal PageProps constraint
  params,
}: { params: Promise<{ category_id: string }> }): Promise<React.ReactElement> {
  // Await params to resolve the actual object containing category_id
  const { category_id } = await params

  // The local data files (appartmentsData, etc.) are not directly used here for rendering MainCard content,
  // as useMarketplaceListings is the primary data source for the listings.
  // They can still be used for metadata generation or other purposes if needed.
  return <ListingContent initialCategory={category_id} />
}
  