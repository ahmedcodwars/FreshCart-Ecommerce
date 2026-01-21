import { useNavigate } from "react-router-dom";
import { useAddToWishlist } from "./addToWishlist";
import { useRemoveFromWishlist } from "./useRemoveFromWishlist";
import { useWishlist } from "./useWishlist";

export const useToggleWishlist = () => {
    const { data: wishlist } = useWishlist();
    const { mutate: addToWishlist } = useAddToWishlist();
    const { mutate: removeProductFromWishlist } = useRemoveFromWishlist();
    const navigate = useNavigate();
    const token = localStorage.getItem('user');
    function toggleWishlist(productId: string) {
        const isProductExistinginWishlist: boolean = wishlist?.some((product) => product._id === productId);
        if (!token)
            navigate('/auth/sign-in');

        if (isProductExistinginWishlist)
            removeProductFromWishlist(productId)
        else
            addToWishlist(productId);
    }
    return toggleWishlist;
} 