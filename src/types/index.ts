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