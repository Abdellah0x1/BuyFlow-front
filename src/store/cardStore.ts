import { addProductCart, deleteProductFromCart, getUserCart } from "@/api/cart";
import type { Product } from "@/types";
import { create } from "zustand"






interface CartState {
    items: Product[],
    cartId: number | null,
    totalPrice: number,
    isLoading: boolean,
    totalItems: number,
    error: string | null,
    clearCart: () => void,
    fetchCart: () => Promise<void>,
    addToCart: (productId: string, quantity: number) => Promise<void>,
    deleteFromCart: (cartId: string | number, productId: string | number) => Promise<void>,

}

export const useCartStore = create<CartState>()((set, get) => ({
    items: [],
    cartId: null,
    isLoading: false,
    error: null,
    totalPrice: 0,
    totalItems: 0,

    clearCart: () => set({ items: [], cartId: null, totalPrice: 0, totalItems: 0, error: null }),

    fetchCart: async () => {
        try {
            set({ isLoading: true });
            const res = await getUserCart();

            if (res.success) {
                set({ cartId: res.data.cartId, items: res.data.products, totalPrice: res.data.totalPrice, totalItems: res.data.products.length, isLoading: false, error: null })
            } else {
                set({ items: [], totalPrice: 0, totalItems: 0, error: res.error, isLoading: false })
            }
        } catch {
            set({ items: [], totalPrice: 0, totalItems: 0, error: "something went wrong", isLoading: false })
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
    },
    deleteFromCart: async (cartId: string | number, productId: string | number) => {
        try {
            set({ isLoading: true })
            const res = await deleteProductFromCart(cartId, productId);

            if (res.success) {
                set({ isLoading: false })
                await get().fetchCart();
            } else {
                set({ isLoading: false, error: res.error })
            }
        } catch {
            set({ isLoading: false, error: "something went wrong" })
        }

    }
}));
