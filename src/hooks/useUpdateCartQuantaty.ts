import { CartData } from "@/Store/Cart-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast";

interface UpdateCartVariables {
    productId: string;
    count: number;
}

export const useUpdateCartQuantaty = () => {
    const queryClient = useQueryClient();
    const UpdateCartQuantaty = async (
        { productId, count }: UpdateCartVariables
    ): Promise<CartData> => {
        const token = localStorage.getItem('user');
        const { data } = await axios.put<{data: CartData}>(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { count },
            { headers: { token } }
        )
        return data.data;
    }

    return useMutation<CartData, AxiosError<{message: string}>, UpdateCartVariables>({
        mutationFn: UpdateCartQuantaty,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            toast.success("Quantity updated!")
        },
        onError: (err) => {
            toast.error(err.response?.data.message || "Failed to update quantity");
        }
    })
}