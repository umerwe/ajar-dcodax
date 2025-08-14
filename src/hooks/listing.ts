import { useQuery } from "@tanstack/react-query"
import { getList, getListing } from "@/services/listing"


export function useMarketplaceListings(params: MarketplaceListingsProps) {
  return useQuery({
    queryKey: ["marketplaceListings", params],
    queryFn: () => getListing(params),
  })
}

export function useMarketplaceList(params: { id: string }) {
  return useQuery({
    queryKey: ["marketplaceList"],
    queryFn: () => getList(params),
  })
}
