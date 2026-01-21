import { create } from "zustand";

interface productData {
    _id: string;
    imageCover: string;
    title: string;
    category?: {
        name: string;
    }
}
interface CartProduct {
    _id: string;
    price: number;
    count: number;
    product: productData;
}
export interface CartData {
    totalCartPrice: number;
    products: CartProduct[];
}

interface CartState {
    cart: CartData | null,
    setCart: (cart: CartData) => void;
}
export const useCartStore = create<CartState>((set) => ({
    cart: null,
    setCart: (cart) => set({ cart }),
}))
