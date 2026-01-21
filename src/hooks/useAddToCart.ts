import { CartData } from "@/Store/Cart-store";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const useAddToCart = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const getProduct = async (productId: string) => {
        const token = localStorage.getItem("user");
        const { data } = await axios.post<{ data: CartData[] }>("https://ecommerce.routemisr.com/api/v1/cart",
            { productId },
            { headers: { token } }
        )
        return data.data;
    }
    return useMutation<CartData[], AxiosError<{ message: string }>, string>({
        mutationFn: getProduct,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
            toast.success("Added to cart!")
        },

        onError: (err) => {
            const error = err as AxiosError<{ message: string }>
            toast.error(error.response?.data?.message);
            navigate('/auth/sign-in')
        }
    })
}