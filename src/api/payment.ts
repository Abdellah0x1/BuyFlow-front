import api from "./axios";


type paymentIntent = {
    orderId: number,
    clientSecret: string,
    paymentIntentId: string
}


export async function createPaymentIntent(orderId: number): Promise<{ success: boolean, data?: paymentIntent, error?: string }> {
    try {
        const res = await api.post(`/payments/${orderId}/intent`)
        return {
            success: true,
            data: res.data
        }
    } catch (error: any) {
        const validationError = error?.response?.data?.message || "can't create payment intent please try again"
        return {
            success: false,
            error: validationError
        }
    }
}