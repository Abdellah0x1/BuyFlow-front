import { create } from "zustand";
import { getMyProducts } from "@/api/seller";
import type { Product } from "@/types";

type SellerState = {
    products: Product[];
    totalProducts: number;
    isLoading: boolean;
    error: string | null;
    fetchSellerProducts: () => Promise<void>;
};

export const useSellerStore = create<SellerState>((set) => ({
    products: [],
    totalProducts: 0,
    isLoading: false,
    error: null,

    fetchSellerProducts: async () => {
        set({ isLoading: true, error: null });

        try {
            const res = await getMyProducts();

            console.log('res for fetching my products', res.data)
            if (res.success) {
                const fetchedProducts = res.data.content;
                const totalProducts = res.data.totalElements;

                set({
                    products: fetchedProducts,
                    totalProducts: totalProducts,
                    isLoading: false,
                    error: null
                });
            } else {
                set({ error: res.error, isLoading: false });
            }
        } catch (error) {
            set({
                error: "Failed to fetch seller products",
                isLoading: false
            });
        }
    }
}));
