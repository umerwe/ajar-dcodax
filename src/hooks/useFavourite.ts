import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getFavourite, addFavourite, removeFavourite } from "@/services/favourite";
import { toast } from "@/hooks/use-toast";

interface ErrorResponse {
    message: string;
}

export const useGetFavourite = () => {
    return useQuery({
        queryKey: ["favourites"],
        queryFn: getFavourite,
    });
}

export const useAddFavourite = () => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: addFavourite,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favourites"] });
            toast({
                title: "Added to favourites",
                description: "Property has been saved to your favourites.",
            });
        },
        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            toast({
                title: "Error",
                description: err.response?.data?.message || "Failed to add to favourites.",
                variant: "destructive",
            });
        },
    });

    return mutation;
};

// <CHANGE> Added remove favourite hook
export const useRemoveFavourite = () => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: removeFavourite,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favourites"] });
            toast({
                title: "Removed from favourites",
                description: "Property has been removed from your favourites.",
            });
        },
        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            toast({
                title: "Error",
                description: err.response?.data?.message || "Failed to remove from favourites.",
                variant: "destructive",
            });
        },
    });

    return mutation;
};

export const useIsFavourite = (listingId: string) => {
    const { data =  [] } = useGetFavourite();
    return data.favourites?.some((fav: Favourite) => fav.listing._id === listingId);
};
