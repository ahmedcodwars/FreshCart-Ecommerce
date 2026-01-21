import { CartData } from "@/Store/Cart-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast";

export const useClearCart = () => {
    const queryClient = useQueryClient();
    const clearCart = async () => {
        const token = localStorage.getItem("user");
        const { data } = await axios.delete<{data: CartData}>("https://ecommerce.routemisr.com/api/v1/cart",
            { headers: { token } }
        )
        return data.data
    }

    return useMutation({
        mutationFn: clearCart,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["cart"]});
            toast.success("Cleared Cart!");
        },
        onError: (err) => {
            const error = err as AxiosError<{message: string}>
            toast.error(error.response?.data?.message|| "Failed to clear cart")
        }
    })
}