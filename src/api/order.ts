import type { Payment, Product } from "@/types";
import api from "./axios";


export type Order = {
    orderId: number,
    email: string,
    orderItems: OrderItem[],
    orderDate: string,
    payment: Payment,
    totalAmount: number,
    orderStatus: string,
    addressId: number
}

export type OrderItem = {
    orderItemId: number,
    product: Product,
    quantity: number,
    discount: number,
    orderedProductPrice: number
}

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


export async function getUserOrder() {

    try {
        const res = await api.get("/users/me/orders")
        return {
            success: true,
            data: res.data
        }

    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Failed to fetch orders"
        return {
            success: false,
            message: errorMessage
        }
    }
}