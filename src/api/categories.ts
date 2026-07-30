import api from "./axios"



export const getCategories = async () => {
    try {
        const res = await api.get(`${import.meta.env.VITE_BACKEND_URL}/public/categories`)
        return {
            success: true,
            data: res.data
        }
    } catch (error: any) {
        const validationMessage = error.response?.data.message || "Something went wrong try again"

        console.error("Error fetching categories:", error);
        return {
            success: false,
            error: validationMessage
        }
    }
}


