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



export const getProducts = async (sortBy: string, sortOrder: "asc" | "desc", pageSize = 10, categoryId?: string) => {
    try {
        const url = categoryId ? `/public/categories/${categoryId}/products` : `/public/products`
        const res = await api.get(
            `${url}?sortBy=${sortBy}&sortOrder=${sortOrder}&pageSize=${pageSize}`
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

export const getProductById = async (id: string | number) => {
    try {
        const res = await api.get(`/public/products/${id}`)
        return {
            success: true,
            data: res.data
        }
    } catch (error: any) {
        const validationMessage = error.response?.data.message || "Something went wrong try again"
        console.error("Error fetching product:", error);
        return {
            success: false,
            error: validationMessage
        }
    }
}
