import { getProducts } from "@/api/products"
import type { Product } from "@/types"
import { create } from "zustand"


type ProductState = {
    products: Product[],
    isLoading: boolean,
    error: string | null,
    totalPages: number,
    totalElements: number,
    pageSize: number,
    pageNumber: number,
    lastPage: boolean,
    fetchProducts: (page?: number, sortBy?: string, sortOrder?: "asc" | "desc", categoryId?: string) => Promise<void>
}


export const useProductsStore = create<ProductState>((set, get) => ({
    products: [],
    isLoading: false,
    error: null,
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 0,
    lastPage: true,


    fetchProducts: async (page = 0, sortBy = "productId", sortOrder: "asc" | "desc" = "desc", categoryId?: string) => {
        set({ isLoading: true, error: null });

        try {
            const res = await getProducts(sortBy, sortOrder, 10, categoryId)
            if (res.success) {
                set({
                    products: res.data,
                    isLoading: false,
                    error: null,
                    totalPages: res.totalPages,
                    totalElements: res.totalElements,
                    pageSize: res.pageSize,
                    pageNumber: res.pageNumber,
                    lastPage: res.lastPage
                })
            }
            else {
                set({ error: res.error })
            }
        } catch (error) {
            set({
                error: "Failed to fetch products"
            })
        } finally {
            set({ isLoading: false })
        }
    }
}))