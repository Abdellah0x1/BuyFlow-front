import api from "./axios";


export async function getUserCart() {
    try {
        const res = await api.get(`/carts/users/cart`)
        return {
            success: true,
            data: res.data
        }
    } catch (error: any) {
        const errrorMessage = error?.response?.data?.message || "Couldn't fetch cart details"
        return {
            success: false,
            error: errrorMessage
        }
    }
}


export async function addProductCart(productId: string, quantity: number) {
    try {
        const res = await api.post(`/carts/products/${productId}/quantity/${quantity}`)
        return {
            success: true,
            data: res.data
        }
    } catch (error: any) {
        const errrorMessage = error?.response?.data?.message || "Couldn't add product to cart"
        return {
            success: false,
            error: errrorMessage
        }
    }
}

export async function updateCart(productId: string, operation: "add" | "delete") {
    try {
        const res = await api.put(`/cart/products/${productId}/quantity/${operation}`)
        return {
            success: true,
            data: res.data
        }
    } catch (error: any) {
        const errrorMessage = error?.response?.data?.message || "Couldn't update cart"
        return {
            success: false,
            error: errrorMessage
        }
    }
}
