import api from "./axios";
import { getApiErrorMessage } from "./error";


export async function getUserCart() {
    try {
        const res = await api.get(`/carts/users/cart`)
        return {
            success: true,
            data: res.data
        }
    } catch (error) {
        const errrorMessage = getApiErrorMessage(error, "Couldn't fetch cart details")
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
    } catch (error) {
        const errrorMessage = getApiErrorMessage(error, "Couldn't add product to cart")
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
    } catch (error) {
        const errrorMessage = getApiErrorMessage(error, "Couldn't update cart")
        return {
            success: false,
            error: errrorMessage
        }
    }
}


export async function deleteProductFromCart(cartId: string | number, productId: string | number) {
    try {
        const res = await api.delete(`/cart/${cartId}/products/${productId}`)
        return {
            success: true,
            data: res.data
        }
    } catch (error) {
        const errrorMessage = getApiErrorMessage(error, "Couldn't delete product from cart")
        return {
            success: false,
            error: errrorMessage
        }
    }
}
