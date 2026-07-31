import api from "./axios";

export type ProductPayload = {
    productName: string,
    description: string,
    price: number,
    quantity: number,
    discount: number,
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
            `admin/categories/${categoryId}/product`,
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



export const getProducts = async (sortBy: string, sortOrder: "asc" | "desc", pageSize = 10) => {
    try {
        const res = await api.get(
            `/public/products?sortBy=${sortBy}&sortOrder=${sortOrder}&pageSize=${pageSize}`
        )

        return {
            success: true,
            data: res.data.content,
            pageNumber: res.data.pageNumber,
            totalPages: res.data.totalPages,
            totalElements: res.data.totalElements,
            pageSize: res.data.pageSize,
            lastPage: res.data.lastPage
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

