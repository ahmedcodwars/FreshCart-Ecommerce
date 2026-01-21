import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CartData, useCartStore } from "../Store/Cart-store";

export function useCart() {
    const setCart = useCartStore((state) => state.setCart);
    const getCart = async ():Promise<CartData> => {
        const token = localStorage.getItem("user");

        const { data } = await axios.get<{data: CartData}>(
            "https://ecommerce.routemisr.com/api/v1/cart",
            { headers: { token } }
        );

        setCart(data.data);
        return data.data;
    }
    return useQuery<CartData>({
        queryKey: ["cart"],
        queryFn: getCart
    });
}
