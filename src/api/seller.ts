import api from "./axios";

export async function getMyProducts() {
    try {
        const res = await api.get("/seller/products")
        return {
            success: true,
            data: res.data
        }
    } catch (error: any) {
        const message = error.response?.message || "could not fetch seller products"
        return {
            success: false,
            error: message
        }
    }
}