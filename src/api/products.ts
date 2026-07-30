import api from "./axios";

export type ProductPayload = {
    name: string,
    description: string,
    price: number,
    quantity: number,
    discount: number
}

export async function createProduct(
    categoryId: number,
    product: ProductPayload,
    images: File[]
) {
    const formData = new FormData();

    formData.append(
        "product",
        JSON.stringify(product)
    )

    images.forEach(file => {
        formData.append("images", file);
    })

    try {
        const res = await api.post(
            `admin/categories/${categoryId}/products`,
            formData
        )

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

