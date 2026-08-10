import api from "./axios";
import { getApiErrorMessage } from "./error";

export async function getMyProducts() {
    try {
        const res = await api.get("/seller/products")
        return {
            success: true,
            data: res.data
        }
    } catch (error) {
        const message = getApiErrorMessage(error, "could not fetch seller products")
        return {
            success: false,
            error: message
        }
    }
}


export async function getSellerOrders() {
    const res = await api.get("/seller/orders")
    return res.data
}

