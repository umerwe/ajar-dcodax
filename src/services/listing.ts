import api from "@/lib/axios"

interface MarketplaceListingsParams {
  page?: number
  limit?: number
  category?: string
  subCategory?: string
}

export async function getListing(params: MarketplaceListingsParams) {
  const { page, limit, subCategory } = params

  const requestParams: Record<string, string | number> = {
    zone: "68934f22cb0f4ba646a17026",
    page: page ?? "",
    limit: limit ?? "",
  }
  
  if (subCategory) {
    requestParams.subCategory = subCategory
  }

  const { data } = await api.get("/api/marketplace-listings", {
    params: requestParams,
  });

  return data.data
}
