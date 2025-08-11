import { useQuery } from "@tanstack/react-query"
import { getListing } from "@/services/listing"

interface MarketplaceListingsParams {
  page?: number
  limit?: number
  category?: string
  subCategory?: string
}

export function useMarketplaceListings(params: MarketplaceListingsParams) {
  return useQuery({
    queryKey: ["marketplaceListings", params],
    queryFn: () => getListing(params),
  })
}
