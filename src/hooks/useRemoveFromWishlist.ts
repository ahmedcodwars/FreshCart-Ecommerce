import { ProductData } from "@/Store/Wishlist-store";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useRemoveFromWishlist = () => {
    const queryClient = useQueryClient();

    const removeProductFromWishlist = async (productId: string) => {
        const token = localStorage.getItem('user');
        const { data } = await axios.delete<{data: ProductData[]}>(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            { headers: { token } }
        )
        return data.data;
    }

    return useMutation<ProductData[], AxiosError<{message: string}>, string>({
        mutationFn: removeProductFromWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['wishlist']});
            toast.success("Removed from wishlist");
        },

        onError: (err) => {
            const error = err as AxiosError<{message: string}>;
            toast.error(error.response?.data?.message || "Failed to remove product")
        }
    })
}