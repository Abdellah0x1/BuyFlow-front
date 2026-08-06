import api from "./axios"


export type Address = {
    street: string,
    city: string,
    state: string,
    zipcode: string,
    country: string
}

export async function createAddress(address: Address) {
    try {
        const res = await api.post(`/addresses`, address)
        return {
            success: true,
            data: res.data
        }
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || "Can't create address Please Try Again !"
        return {
            success: false,
            error: errorMessage
        }
    }
}

export async function getUserAddresses() {
    try {
        const res = await api.get("/users/addresses")
        return {
            success: true,
            data: res.data
        }
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || "Can't fetch addresses Please Try Again !"
        return {
            success: false,
            error: errorMessage
        }
    }
}