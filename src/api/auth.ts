import api from "./axios";
import { getApiErrorMessage } from "./error";
import type { LoginPayload, SingUpPayload } from "../types";



export async function LoginRequest(loginInfo: LoginPayload) {
    try {
        const res = await api.post(`/auth/signin`, loginInfo)
        return {
            success: true,
            data: res.data
        }
    } catch (error) {
        const errorMessage = getApiErrorMessage(error, "Can't login Please Try Again !")
        return {
            success: false,
            error: errorMessage
        }
    }
}

export const singUpRequest = async (SingUpPayload: SingUpPayload) => {
    try {
        const res = await api.post(`/auth/signup`, SingUpPayload)
        console.log("Sign up payload : ", SingUpPayload)

        return {
            success: true,
            data: res.data
        }
    } catch (error) {
        const errorMessage = getApiErrorMessage(error, "Can't Sign Up Please Try Again !")

        console.log("Error sign up request ", error)

        return {
            success: false,
            error: errorMessage
        }
    }
}

export async function logoutRequest() {
    try {
        const res = await api.post(`/auth/logout`)
        return {
            success: true,
            data: res.data
        }
    } catch (error) {
        const errorMessage = getApiErrorMessage(error, "Could not logout Please Try Again !")
        return {
            success: false,
            error: errorMessage
        }
    }
}

export async function getCurrentUser() {
    try {
        const res = await api.get(`/auth/user`)
        return {
            success: true,
            data: res.data
        }
    } catch (error) {
        const errorMessage = getApiErrorMessage(error, "Could not get current user Please Try Again !")
        return {
            success: false,
            error: errorMessage
        }
    }
}
