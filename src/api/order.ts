import type { Product } from "@/types";
import api from "./axios";





export async function createOrder(addressId: number) {

    try {
        const res = await api.post("/orders", {
            addressId
        })
        return {
            success: true,
            data: res.data
        }

    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Failed to create order"
        return {
            success: false,
            message: errorMessage
        }
    }
}