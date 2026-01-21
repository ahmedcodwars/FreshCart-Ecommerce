import { ProductData } from "@/Store/Wishlist-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast";

export const useAddToWishlist = () => {
    const queryClient = useQueryClient();
    const getProduct = async (productId: string) => {
        const token = localStorage.getItem('user');
        const { data } = await axios.post<{data: ProductData[]}>('https://ecommerce.routemisr.com/api/v1/wishlist',
            { productId },
            { headers: { token } }
        )
        return data.data;
    }

    return useMutation<ProductData[], AxiosError<{message: string}>, string>({
        mutationFn: getProduct,

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['wishlist']});
            toast.success("Added to wishlist!")
        },

        onError: (err) => {
            const error = err as AxiosError<{message: string}>
            toast.error(error.response?.data?.message || "Failed to add product")
        }
    })
}