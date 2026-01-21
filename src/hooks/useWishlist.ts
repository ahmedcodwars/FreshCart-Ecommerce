import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { ProductData, useWishlistStore } from "../Store/Wishlist-store";


export const useWishlist = () => {
    const setWishlist = useWishlistStore((state) => state.setWishlist);
    const getWishlist = async (): Promise<ProductData[]> => {
        const token = localStorage.getItem('user');
        const { data } = await axios.get<{data: ProductData[]}>(
            "https://ecommerce.routemisr.com/api/v1/wishlist",
            { headers: { token } }
        )
        setWishlist(data.data);
        return data.data;
    }
    return useQuery<ProductData[]>({
        queryKey: ["wishlist"],
        queryFn: getWishlist,
    })
}