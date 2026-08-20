import api from "./axios";
import { getApiErrorMessage } from "./error";

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
    } catch (error) {
        const validationMessage = getApiErrorMessage(error, "Something went wrong try again")

        console.error("Error fetching categories:", error);
        return {
            success: false,
            error: validationMessage
        }
    }
}



export const getProducts = async (sortBy: string, sortOrder: "asc" | "desc", pageNumber = 0, pageSize = 10, categoryId?: string) => {
    try {
        const url = categoryId ? `/public/categories/${categoryId}/products` : `/public/products`
        const res = await api.get(
            `${url}?sortBy=${sortBy}&sortOrder=${sortOrder}&pageNumber=${pageNumber}&pageSize=${pageSize}`
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
    } catch (error) {
        const validationMessage = getApiErrorMessage(error, "Something went wrong try again")

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
    } catch (error) {
        const validationMessage = getApiErrorMessage(error, "Something went wrong try again")
        console.error("Error fetching product:", error);
        return {
            success: false,
            error: validationMessage
        }
    }
}



export async function searchProductByKeyword(keyword: string) {
    try {
        const res = await api.get(`/public/products/keyword/${keyword}`)
        return {
            success: true,
            data: res.data.content
        }
    } catch (error) {
        const validationMessage = getApiErrorMessage(error, "Something went wrong try again")
        return {
            success: false,
            error: validationMessage
        }
    }
}


export async function updateProduct(id: string | number, product: ProductPayload) {
    try {
        const res = await api.put(`/admin/products/${id}`, product);
        return {
            success: true,
            data: res.data
        }
    } catch (error) {
        const validationMessage = getApiErrorMessage(error, "Something went wrong try again")
        console.error("Error updating product:", error);
        return {
            success: false,
            error: validationMessage
        }
    }
}