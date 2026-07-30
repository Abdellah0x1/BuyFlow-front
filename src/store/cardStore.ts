import { create } from "zustand"
import { persist } from "zustand/middleware"

//store for handeling global cart state 

export interface CartItem {
    id: string,
    name: string,
    price: number,
    quantity: number,
    image: string
}



interface CartState {
    items: CartItem[],
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    updateQuantity: (id: string, quantity: number) => void;
    totalItems: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addToCart: (newItem) => set((state) => {
                const existingItem = state.items.find(item => item.id === newItem.id);
                if (existingItem) {
                    // If item exists, just increase quantity
                    return {
                        items: state.items.map(item =>
                            item.id === newItem.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    };
                }
                // Otherwise, add new item
                return { items: [...state.items, { ...newItem, quantity: 1 }] };
            }),
            removeFromCart: (itemId) => set((state) => ({
                items: state.items.filter(item => item.id !== itemId)
            })),
            updateQuantity: (itemId, quantity) => set((state) => ({
                items: state.items.map(item =>
                    item.id === itemId ? { ...item, quantity } : item
                )
            })),
            clearCart: () => set({ items: [] }),
            totalItems: () => {
                const items = get().items;
                return items.reduce((total, item) => total + item.quantity, 0);
            }
        }),
        {
            name: 'cart-storage',
        }
    )
);