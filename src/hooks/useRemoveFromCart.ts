import { CartData } from "@/Store/Cart-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();

    const removeFromCart = async (productId: string) => {
        const token = localStorage.getItem("user");

        const { data } = await axios.delete<{data: CartData[]}>(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers: { token },
            }
        );

        return data.data;
    };

    return useMutation({
        mutationFn: removeFromCart,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["cart"]});
            toast.success("Removed from cart!");
        },
        onError: (err) => {
            const error = err as AxiosError<{message: string}>
            toast.error(error.response?.data?.message || "Error");
        },
    });
};
