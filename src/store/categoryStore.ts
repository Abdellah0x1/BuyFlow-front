import { create } from "zustand"
import { getCategories } from "@/api/categories"

type Category = {
    categoryId: number,
    categoryName: string
}


type CategoryState = {
    categories: Category[],
    isLoading: boolean,
    fetchCategories: () => Promise<void>
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
    categories: [],
    isLoading: false,
    fetchCategories: async () => {
        if (get().categories.length > 0) return;

        set({ isLoading: true })
        try {
            const res = await getCategories();


            if (res.success) {
                const data = res.data;
                const categoriesArray = Array.isArray(data) ? data : (data?.content || data?.data || []);
                set({ categories: categoriesArray })
            } else {
                set({ categories: [] });
            }
        } catch (error) {
            set({ categories: [] });
        } finally {
            set({ isLoading: false })
        }
    }
}))