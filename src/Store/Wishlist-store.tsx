import { create } from "zustand";

export interface ProductData {
    _id: string;
    imageCover: string;
    title: string
    category: {
        name: string;
    }
    price: number;
}

interface wishlistState {
    wishlist: ProductData[];
    setWishlist: (wishlist: ProductData[]) => void;
}
export const useWishlistStore = create<wishlistState>((set) => ({
    wishlist: [],
    setWishlist: (wishlist: ProductData[]) => set({ wishlist })
}))