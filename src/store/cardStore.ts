import { addProductCart, getUserCart } from "@/api/cart";
import type { Product } from "@/types";
import { create } from "zustand"






interface CartState {
    items: Product[],
    totalPrice: number,
    isLoading: boolean,
    totalItems: number,
    error: string | null,
    fetchCart: () => Promise<void>,
    addToCart: (productId: string, quantity: number) => Promise<void>,

}

export const useCartStore = create<CartState>()((set, get) => ({
    items: [],
    isLoading: false,
    error: null,
    totalPrice: 0,
    totalItems: 0,

    fetchCart: async () => {
        try {
            set({ isLoading: true });
            const res = await getUserCart();

            if (res.success) {
                set({ items: res.data.products, totalPrice: res.data.totalPrice, totalItems: res.data.products.length })
            } else {
                set({ error: res.error, isLoading: false })
            }
        } catch (error) {
            set({ error: "something went wrong", isLoading: false })
        }
    },

    addToCart: async (productId: string, quantity: number) => {
        set({ isLoading: true })
        const res = await addProductCart(productId, quantity);

        if (res.success) {
            set({ isLoading: false })
            await get().fetchCart();
        } else {
            set({ isLoading: false, error: res.error })
        }
    }
}));