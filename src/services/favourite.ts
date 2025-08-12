import api from "@/lib/axios"

interface FavouritePayload {
  listingId: string
}

export const getFavourite = async () => {
  const { data } = await api.get("/api/favourites")
  return data;
}

export const addFavourite = async (payload: FavouritePayload) => {
  const { data } = await api.post("/api/favourites", payload)
  return data.data
}

export const removeFavourite = async (listingId: string) => {
  const { data } = await api.delete(`/api/favourites/${listingId}`)
  return data
}
