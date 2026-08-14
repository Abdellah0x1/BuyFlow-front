export type LoginPayload = {
    email: string
    password: string
}


export type SingUpPayload = {
    username: string,
    email: string,
    password: string,
    roles: string[]
}


export type Product = {
    productId: number,
    productName: string,
    description: string,
    quantity: number,
    price: number,
    specialPrice: number,
    discount: number,
    images: {
        id: number,
        url: string,
        displayOrder: number
    }[]
}


export type orderItem = {
    orderItemId: number,
    product: Product,
    quantity: number,
    discount: number,
    orderedProductPrice: number
}

export type Payment = {
    id: string,
    provider: string,
    paymentIntentId: string,
    paymentMethod: string | null
    status: string,
    currency: string,
    amount: number,
    paidAt?: string | null
}

export type Order = {
    orderId: number,
    email: string,
    orderItems: orderItem[],
    orderDate: string,
    payment: Payment
}


export type Notification = {
    id: number,
    message: string,
    isRead: Boolean,
    type: string,
    createdAt: string
}