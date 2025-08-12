import { useQuery } from "@tanstack/react-query"
import { getListing } from "@/services/listing"

interface MarketplaceListingsProps {
  page?: number
  limit?: number
  category?: string
  subCategory?: string
}

export function useMarketplaceListings(params: MarketplaceListingsProps) {
  return useQuery({
    queryKey: ["marketplaceListings", params],
    queryFn: () => getListing(params),
  })
}
